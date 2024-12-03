import ProductCard from "@/components/ProductCard"
import { conn } from "@/lib/mysql"

async function loadProducts(){
    const products = await conn.query('SELECT * FROM productos');
    return products;
}

async function ProductsPage() {
    const products = await loadProducts()
    console.log(products)
  return <div className="grid gap-4 grid-cols-4">
    {products.map(product => (
        <ProductCard product={product} key={product.id}/>
    ))}
        
  </div>

}

export default ProductsPage