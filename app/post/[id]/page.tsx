import Link from 'next/link';
import { notFound } from 'next/navigation';

type Post = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
};

interface PageProps {
  params: { id: string }
}

export default async function PostPage({ params }: PageProps) {
  // Aqui, params NÃO é uma Promise, deve estar disponível diretamente!
  const {id} = await params;
  const res = await fetch(`https://blog.ted.com/wp-json/wp/v2/posts/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    notFound();
  }

  const post: Post = await res.json();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <Link href="/" style={{ textDecoration: 'underline', marginBottom: 24, display: 'inline-block' }}>
        &larr; Voltar para Home
      </Link>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <p style={{ color: '#aaa', marginTop: 24 }}>
        Publicado em {new Date(post.date).toLocaleDateString()}
      </p>
    </div>
  );
}