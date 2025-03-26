export default async function HomePage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/slug/home`, {
      cache: 'force-cache',
    });
    const data = await res.json();
  
    return (
      <main className="min-h-screen w-full px-4 py-8">
        <div dangerouslySetInnerHTML={{ __html: data?.html || "<p>Failed to load homepage.</p>" }} />
      </main>
    );
  }
  