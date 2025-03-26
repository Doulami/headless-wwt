export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/woo/products`);
    const products = await res.json();
  
    return products.map((p) => ({ slug: p.slug }));
  }
  
  export default async function ProductPage({ params, searchParams }) {
    const debug = searchParams?.debug === '1' ? '&debug=1' : '';
    const nocache = searchParams?.nocache === '1' ? '&nocache=1' : '';
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API}/woo/product/${params.slug}?format=json${nocache}${debug}`,
      { cache: 'force-cache' }
    );
    const data = await res.json();
  
    return (
      <main className="min-h-screen w-full px-4 py-8">
        <div dangerouslySetInnerHTML={{ __html: data?.html || "<p>Product not found</p>" }} />
      </main>
    );
  }
  