interface Env {
    DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;
        const body = await request.json() as any;

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { name, email, message, locale, timestamp } = body;

        // Insert into D1
        const result = await env.DB.prepare(
            'INSERT INTO messages (name, email, message, locale, created_at) VALUES (?, ?, ?, ?, ?)'
        )
            .bind(name, email, message, locale || 'en', timestamp || new Date().toISOString())
            .run();

        if (!result.success) {
            throw new Error('Failed to insert into database');
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
