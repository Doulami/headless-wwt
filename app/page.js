/*
Next.js 14+ App Router based frontend for Elementor Headless API plugin.
This works with Vercel and your live WP site: https://wwt-technology.com
*/

// Directory structure (Next.js 14 app router)
// └── app/
//     ├── page.js               --> Homepage (/)
//     ├── [slug]/page.js        --> Pages (/about, /contact, etc)
//     └── product/[slug]/page.js --> WooCommerce Products (/product/example)

// .env.local (not committed to Git)
// NEXT_PUBLIC_WP_API=https://wwt-technology.com/wp-json/headless-elementor/v1


// app/page.js
export default async function HomePage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/slug/home`, { cache: 'force-cache' });
    const data = await res.json();
  
    return <div dangerouslySetInnerHTML={{ __html: data?.html || '<p>Home failed to load.</p>' }} />;
  }
  
  
  // app/[slug]/page.js
  export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pages`);
    const pages = await res.json();
  
    return pages.map((p) => ({ slug: p.slug }));
  }
  
  export default async function DynamicPage({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/slug/${params.slug}`, { cache: 'force-cache' });
    const data = await res.json();
  
    return <div dangerouslySetInnerHTML={{ __html: data?.html || '<p>Page not found</p>' }} />;
  }
  
  
  // app/product/[slug]/page.js
  export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/products`);
    const products = await res.json();
  
    return products.map((product) => ({ slug: product.slug }));
  }
  
  export default async function ProductPage({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/product/${params.slug}`, { cache: 'force-cache' });
    const data = await res.json();
  
    return <div dangerouslySetInnerHTML={{ __html: data?.html || '<p>Product not found</p>' }} />;
  }
  