"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({productId}) {
  const router = useRouter();

  return (
    <div>
        <button 
          className="bg-red-600 text-white hover:bg-red-800 py-2 px-3 rounded"
          onClick={ async () => {
            if(confirm('Esta seguro que desea eliminar este producto?')){
                const res = await axios.delete("http://localhost:3000/api/products/"+ productId)
                console.log(res)
                if(res.status === 204){
                    router.push("/dashboard/products")
                    router.refresh()
                }
            }
          }}>
            Eliminar
        </button>
        <button 
          className="bg-blue-500 text-white hover:bg-blue-800 py-2 px-3 rounded"
          onClick={()=>{
            router.push(`/dashboard/products/edit/${productId}`)
          }}
          >
            Editar
        </button>
    </div>
  )
}

export default Buttons