export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pages`);
    const pages = await res.json();
  
    return pages.map((p) => ({ slug: p.slug }));
  }
  
  export default async function DynamicPage({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/slug/${params.slug}`, {
      cache: 'force-cache',
    });
    const data = await res.json();
  
    return (
      <main className="min-h-screen w-full px-4 py-8">
        <div dangerouslySetInnerHTML={{ __html: data?.html || "<p>Page not found</p>" }} />
      </main>
    );
  }
  