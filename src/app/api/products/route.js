import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
import path from "path";
import { Buffer } from "buffer";

export async function GET(){
    const result = await conn.query("SELECT * FROM productos");
    return NextResponse.json(result);
}

export async function POST(request){
    try {
        const data = await request.formData();
        const image = data.get("image");

        let imagePath = null;
        const fileExtension = path.extname(image.name);
        const fileName = `producto_${Date.now()}${fileExtension}`;
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(process.cwd(), "public", "images", fileName);
        require("fs").writeFileSync(filePath,buffer);

        //imagePath = `${fileName}`

        const result = await conn.query("INSERT INTO productos SET ?",{
            nombre: data.get("nombre"),
            descripcion: data.get("descripcion"),
            precio: data.get("precio"),
        });
        console.log(result)



        return NextResponse.json({
            nombre: data.get("nombre"),
            descripcion: data.get("descripcion"),
            precio: data.get("precio"),
            id: result.insertId,
    });
    } catch (error) {
        return NextResponse.json(
            {message: error.message,},
            {status: 500,}
        )
    }
}

//falta agregar el campo a sql
