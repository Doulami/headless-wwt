export const dynamic = 'force-dynamic';

export default async function Page({ params, searchParams }) {
  const query = new URLSearchParams({
    format: 'json',
    ...(searchParams?.nocache === '1' && { nocache: '1' }),
    ...(searchParams?.debug === '1' && { debug: '1' }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/slug/${params.slug}?${query.toString()}`,
    { cache: 'no-store' }
  );

  let data = { html: "<p>Page failed to load</p>" };
  if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
    data = await res.json();
  }

  return (
    <main className="min-h-screen w-full px-4 py-8">
      <div dangerouslySetInnerHTML={{ __html: data.html }} />
    </main>
  );
}
