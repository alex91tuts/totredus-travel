# Content Folder

Acest folder conține articolele blog-ului în format Markdown.

## Structură

```
content/
└── posts/
    ├── ro/          # Articole în română
    │   ├── paris-france.md
    │   ├── tokyo-japan.md
    │   └── bali-indonesia.md
    └── en/          # Articole în engleză
        ├── paris-france.md
        ├── tokyo-japan.md
        └── bali-indonesia.md
```

## Formatul Fișierelor Markdown

Fiecare fișier Markdown trebuie să conțină:

### Frontmatter (YAML)

```yaml
---
title: "Titlul Articolului"
slug: "url-slug"
locale: "ro" sau "en"
date: "YYYY-MM-DD"
featuredImage: "/images/posts/destination/image.jpg"
excerpt: "Descriere scurtă a articolului"
tags: ["tag1", "tag2", "tag3"]
author: "Nume Autor"
---
```

### Conținut

După frontmatter, poți scrie conținutul articolului folosind Markdown standard:

- Titluri cu `#`
- Imagini cu `![alt text](/path/to/image.jpg)`
- Link-uri cu `[text](url)`
- Liste, bold, italic, etc.

## Adăugare Articole Noi

1. Creează un fișier `.md` în folderul corespunzător (`ro/` sau `en/`)
2. Folosește slug-ul ca nume de fișier (ex: `paris-france.md`)
3. Completează frontmatter-ul cu toate informațiile necesare
4. Scrie conținutul articolului în Markdown
5. Adaugă imaginile în `public/images/posts/{destination}/`

## Exemple

Vezi fișierele existente pentru exemple:
- `posts/ro/paris-france.md`
- `posts/en/tokyo-japan.md`
- `posts/ro/bali-indonesia.md`

