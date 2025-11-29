interface Env {
    DB: D1Database;
    ASSETS: Fetcher;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);

        // Handle API requests
        if (url.pathname === '/api/contact' && request.method === 'POST') {
            try {
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

            } catch (error: any) {
                console.error('Error processing request:', error);
                return new Response(JSON.stringify({
                    error: 'Internal Server Error',
                    details: error.message
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        // Fallback to static assets
        return env.ASSETS.fetch(request);
    }
};
