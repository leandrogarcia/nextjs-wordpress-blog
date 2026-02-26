"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PER_PAGE = 10;

async function getPosts(page = 1) {
  const res = await fetch(
    `https://blog.ted.com/wp-json/wp/v2/posts?per_page=${PER_PAGE}&page=${page}`,
    { cache: 'no-store' }
  );
  const posts = await res.json();
  const totalPages = Number(res.headers.get('X-WP-TotalPages'));
  return { posts, totalPages };
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPosts(page).then(({ posts, totalPages }) => {
      setPosts(posts);
      setTotalPages(totalPages);
      setLoading(false);
    });
  }, [page]);

  function handlePaginate(newPage) {
    setLoading(true);
    router.push(`/?page=${newPage}`);
  }

  function handlePostClick(postId) {
    setLoading(true);
    router.push(`/post/${postId}`);
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <h1>Blog TED (Exemplo Next.js)</h1>
      {loading && <div>Carregando...</div>}
      <ul style={{ listStyle: 'none', padding: 0, opacity: loading ? 0.5 : 1 }}>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: 32 }}>
            <h2>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'inherit',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 'inherit'
                }}
                onClick={() => handlePostClick(post.id)}
                disabled={loading}
              >
                <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              </button>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: 8 }}>
        {page > 1 && (
          <button onClick={() => handlePaginate(page - 1)} disabled={loading}>
            Anterior
          </button>
        )}
        <span>Página {page} de {totalPages}</span>
        {page < totalPages && (
          <button onClick={() => handlePaginate(page + 1)} disabled={loading}>
            Próxima
          </button>
        )}
      </div>
    </div>
  );
}