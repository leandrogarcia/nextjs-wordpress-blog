# Next.js Blog with WordPress API

This project is a blog built with [Next.js](https://nextjs.org/) that fetches data from a WordPress site using the REST API. The goal is to combine the flexibility of WordPress as a CMS with the performance and modern features of Next.js as the frontend.

## Features

- List WordPress posts
- View individual posts
- Post pagination
- Search for posts
- SEO optimized with Next.js
- Fast loading and static page generation (SSG/ISR)
- Support for featured images and categories

## How it works

Next.js makes requests to the WordPress REST API (`/wp-json/wp/v2/posts`) to fetch content and render it on the frontend. This way, WordPress serves only as the backend, while Next.js handles the user experience.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install` or `yarn`
3. **Create a `.env.local` file in the root of your project and add your WordPress API URL:**
    ```env
    NEXT_PUBLIC_BLOG_API_URL=https://blog.ted.com/wp-json/wp/v2
    ```
4. Run the project with `npm run dev` or `yarn dev`