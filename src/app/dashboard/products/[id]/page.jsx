import { conn } from "@/lib/mysql"
import Buttons from "./Buttons";

async function loadProducts(productId){
    const [data] = await conn.query("SELECT * FROM productos WHERE id= ?",[
        productId,
      ]);

    return data;
}

async function ProductPage({params}) {
  const product = await loadProducts(params.id)
  console.log(product)

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <div className="p-6 bg-white w-1/3">
            <h3 className="text-2xl font-bold mb-3">{product.nombre}</h3>
            <h4 className="text-4xl font-bold">{product.precio}Bs.</h4>
            <p className="text-slate-700">{product.descripcion}</p>
            <Buttons productId={product.id}/>
        </div>
    </section>
  )
}

export default ProductPage