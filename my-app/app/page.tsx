import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

async function getProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Bryllupsplanlegging</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            {product.image_url && <img src={product.image_url} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }} />}
            <h2 style={{ marginTop: "10px" }}>{product.name}</h2>
            <p>{product.description}</p>
            <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>{product.price} NOK</p>
            <Link href={`/produkter/${product.id}`} style={{ color: "blue", textDecoration: "underline" }}>Se detaljer</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
