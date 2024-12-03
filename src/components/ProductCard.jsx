import Link from "next/link";

function ProductCard({product}) {
  return (
    <Link 
      className="bg-white rounded-lg border-gray-300 mb-3 hover:bg-gray-300 hover:cursor-pointer"
      href={`/dashboard/products/${product.id}`}>
        <div className="p-4">
            <h1 className="text-lg font-bold">{product.nombre}</h1>
            <h2 className="text-2xl text-slate-600">{product.precio}</h2>
            <p>{product.descripcion}</p>
        </div>
    </Link>
  )
}

export default ProductCard