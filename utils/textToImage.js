'use server'

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function textToImage(animal, text) {
    const Token = process.env.API_TOKEN
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
            headers: {
                Authorization: `Bearer ${Token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                inputs: `a gift card that cover all the image with the image of a ${animal} and this text '${text}' above, on the top of the card`,
                go_fast: true,

               
            }
            ),
        }
    );
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: path, error } = await supabase.storage
        .from('cms-Main')
        .upload(`iaflux/cardgenerated.jpeg`, buffer, {
            upsert: true,
        })
    if (error) {
        console.error("Error al subir el archivo a Supabase:", error);
        return null;
    }
    const { data: fileURL } = supabase.storage.from("cms-Main").getPublicUrl(path.path)
    const timestamp = new Date().getTime()
    return `${fileURL.publicUrl}?t=${timestamp}`
}
