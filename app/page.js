'use client'

import { useState } from "react";
import { textToImage } from "@/utils/textToImage";
import {saveAs} from "file-saver"

export default function Home() {
    const [animal, setAnimal] = useState('')
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [imageURL, setImageURL] = useState('/Lettest.jpg')
    const [change, setChange] = useState(false)

    const SaveFile=()=>{
        saveAs(imageURL,'GeneradaIA.jpg')
    }

    const aiBlob = async (e) => {
        e.preventDefault()
        setChange(true)
        const imgURL = await textToImage(animal, text)
        console.log('IMAGEN URL', imgURL)
        setImageURL(imgURL)
        setLoading(true)
        setChange(false)
    }

    return (
        <div className="w-9/12 flex flex-col justify-center mt-4 mx-auto">
            <p className="text-6xl text-center p-8 mt-8">Creador de tarjetas con IA</p>
            <form className="w-4/5 flex flex-col gap-4 mx-auto items-center" onSubmit={aiBlob}>
                <input className="p-4 text-xl rounded-lg w-full" type="text"
                    value={animal}
                    onChange={(e) => setAnimal(e.target.value)}
                    placeholder="Ingrese un animalito"
                />
                <input className="p-4 text-xl rounded-lg w-4/5" type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ingrese un titulo"
                />
                <button className="w-3/5 bg-green-600 text-slate-950 text-xl p-4 rounded-xl border-solid border-4 border-green-900 hover:bg-green-400"
                    type="submit">
                    Generar Imagen
                </button>
            </form>
            {change && (
                <img src="/Engranaje.png" width={200} height={200} className="mx-auto animate-spin mt-24" alt="Engranaje" />
            )}
            {!change && (
                <img src={imageURL} width={512} height={512} className="mx-auto mt-4 rounded-xl" alt={change} />
            )}
            {loading && (
                <button className="w-52 bg-green-600 text-slate-950 text-xl p-4 rounded-xl border-solid border-4 border-green-900 hover:bg-green-400 mx-auto mt-4"
                onClick={SaveFile}>
                   Descargar Imagen 
                </button>
            )}

        </div>
    )

}