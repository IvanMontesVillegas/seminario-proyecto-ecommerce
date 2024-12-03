import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";

export async function GET(request, {params}){
    const result = await conn.query("SELECT * FROM productos WHERE id=?",
        [params.id])
    console.log(result)
    if(result.length === 0){
        return NextResponse.json(
            {message: "Producto no encontrado",},
            {status: 404,}
        );
    }
    return NextResponse.json(result[0]);
    
}

export async function DELETE(request, {params}){
    try {
        const result = await conn.query("DELETE FROM productos WHERE id=?",
            [params.id]);
        if(result.affectedRows === 0){
            return NextResponse.json(
                {message: "Producto no encontrado",},
                {status: 404,}
            );
        }
        return new Response(null, {
            status: 204,
        })         
    } catch (error) {
        return NextResponse.json(
            {message: error.message,},
            {status: 500,}
        )
    }
}

export async function PUT( request, {params}){
    const data = await request.json()
    const result = await conn.query("UPDATE productos SET ? WHERE id = ?",[
        data,
        params.id
    ])

    if(result.affectedRows===0){
        return NextResponse.json(
            {message: "Producto no encontrado"},
            {status: 404,}
        )
    }

    const updateProduct = await conn.query("SELECT * FROM productos WHERE id = ?",
        [params.id]
    )

    console.log(result)

    return NextResponse.json(updateProduct[0]);
}