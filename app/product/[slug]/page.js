export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/woo/products`);
    const products = await res.json();
  
    return products.map((product) => ({
      slug: product.slug,
    }));
  }
  
  export default async function ProductPage({ params, searchParams }) {
    const query = new URLSearchParams({
      render: '1',
      format: 'json',
      ...(searchParams?.nocache === '1' && { nocache: '1' }),
      ...(searchParams?.debug === '1' && { debug: '1' }),
    });
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API}/woo/product/${params.slug}?${query.toString()}`,
      { cache: 'force-cache' }
    );
  
    const data = await res.json();
  
    return (
      <main className="min-h-screen w-full px-4 py-8">
        <div dangerouslySetInnerHTML={{ __html: data?.html || '<p>Product not found</p>' }} />
      </main>
    );
  }
  