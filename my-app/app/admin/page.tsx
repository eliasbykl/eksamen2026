import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

async function getProducts() {
  const { data } = await supabase.from("products").select("*").order("created_at");
  return data || [];
}

async function createProduct(formData) {
  "use server";
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const image_url = formData.get("image_url") || null;

  if (!name || !description || !price) {
    return { error: "Navn, beskrivelse og pris er påkrevd" };
  }

  try {
    await supabase.from("products").insert([
      { name, description, price: Number(price), image_url }
    ]);
    revalidatePath("/admin");
  } catch (err) {
    return { error: "Feil ved opprettelse" };
  }
}

async function deleteProduct(formData) {
  "use server";
  const id = formData.get("id");
  try {
    await supabase.from("products").delete().eq("id", id);
    revalidatePath("/admin");
  } catch (err) {
    return { error: "Feil ved sletting" };
  }
}

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Admin</h1>

      <h2>Nytt produkt</h2>
      <form action={createProduct} style={{ display: "grid", gap: "10px", marginBottom: "30px" }}>
        <input name="name" placeholder="Navn" required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        <textarea name="description" placeholder="Beskrivelse" required rows="3" style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        <input name="price" placeholder="Pris" type="number" step="0.01" required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        <input name="image_url" placeholder="Bilde URL" style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        <button type="submit" style={{ padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Opprett</button>
      </form>

      <h2>Produkter</h2>
      <div style={{ display: "grid", gap: "10px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0 }}>{product.name}</h3>
              <p style={{ margin: "5px 0", color: "#666" }}>{product.description}</p>
              <p style={{ margin: 0, fontWeight: "bold" }}>{product.price} NOK</p>
            </div>
            <form action={deleteProduct}>
              <input type="hidden" name="id" value={product.id} />
              <button type="submit" style={{ padding: "8px 15px", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Slett</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
