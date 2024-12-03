"use client";
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation";

function ProductForm() {
    const [product, setProduct] = useState({
        nombre: "",
        precio: 0,
        descripcion: ""
    })
    const [file, setFile] = useState(null);
    const form = useRef(null);
    const router = useRouter();
    const params = useParams();

    const handleChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };

    useEffect(()=>{
      if(params.id){
        axios.get("/api/products/"+ params.id).then((res)=>{
          setProduct({
            nombre: res.data.nombre,
            precio: res.data.precio,
            descripcion: res.data.descripcion,
          });
        })
      }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()

        formData.append("nombre", product.nombre)
        formData.append("precio", product.precio)
        formData.append("descripcion", product.descripcion)
        formData.append("image", file)


        if(!params.id){
          const res = await axios.post('http://localhost:3000/api/products', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
            
          );
          console.log(res)
        }else{
          const res = await axios.put('http://localhost:3000/api/products/'+params.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
          console.log("editando"+res)
        }

        form.current.reset();
        router.refresh();
        router.push('/dashboard/products')
    }

  return (
    <div>
        <form 
          ref={form}
          onSubmit={handleSubmit} 
          className="bg-white shadow-md rounded-md px-8 pb-8 mb-4">
            <label htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2">
                Nombre del Producto:
            </label>
            <input 
              name="nombre"
              type="text" 
              placeholder="Nombre"
              onChange={handleChange}
              value={product.nombre}
              className="shadow appearance-none border rounded w-full py-2 px-3"/>
            
            <label htmlFor="precio" 
              className="block text-gray-700 text-sm font-bold mb-2">
                Precio del Producto:
            </label>
            <input 
              name="precio"
              type="text" 
              placeholder="Precio 00.00"
              onChange={handleChange}
              value={product.precio}
              className="shadow appearance-none border rounded w-full py-2 px-3"
              />
            
            <label htmlFor="descripcion"
              className="block text-gray-700 text-sm font-bold mb-2">
                Descripcion:
            </label>
            <textarea 
              name="descripcion" 
              placeholder="Descripcion"
              onChange={handleChange}
              value={product.descripcion}
              className="shadow appearance-none border rounded w-full py-2 px-3" />
            
            <label htmlFor=""
              className="block text-gray-700 text-sm font-bold mb-2"
            >
                Imagen del Producto
            </label>
            <input 
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2" 
              onChange={(e)=>{
                console.log(e.target.files[0])
                setFile(e.target.files[0])
              }}
            />

            {file && (
              <img src={URL.createObjectURL(file)} alt="" 
                className="w-60 object-contain mx-auto my-4"
              />
            )}
              
            <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                {params.id ? "Editar Producto" : "Guardar Producto"}
            </button>
        </form>
    </div>
  )
}

export default ProductForm