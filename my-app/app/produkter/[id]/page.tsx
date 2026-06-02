import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

async function getProduct(id) {
  const { data } = await supabase.from("products").select("*").eq("id", id).single();
  return data;
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/">← Tilbake</Link>
      <h1>{product.name}</h1>
      {product.image_url && <img src={product.image_url} alt={product.name} style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "5px" }} />}
      <p>{product.description}</p>
      <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>{product.price} NOK</p>
    </main>
  );
}
