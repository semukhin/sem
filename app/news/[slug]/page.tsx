import NewsPostClient from './NewsPostClient';

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // We pass the slug to the Client Component, which will load the data from localStorage
  return <NewsPostClient slug={slug} />;
}
