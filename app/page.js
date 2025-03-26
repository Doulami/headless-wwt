// app/page.js

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const apiUrl = `${process.env.NEXT_PUBLIC_WP_API}/slug/home?format=json&nocache=1&debug=1`;

  const res = await fetch(apiUrl, {
    cache: 'no-store',
    next: { tags: ['home-page'] },
  });

  let data = { html: "<p>Failed to load homepage.</p>" };
  if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
    data = await res.json();
  }

  return (
    <main className="min-h-screen w-full px-4 py-8">
      <div dangerouslySetInnerHTML={{ __html: data.html }} />
    </main>
  );
}
