import { useState } from "react"
import './ProgGalvaEstoque.css'

function ProgGalvaEstoque({ ProgGalvaEstoqueVisibility, closeButton }) {
    return (
        <div className="flex justify-center">
            <div className={`ProgGalvaDiv absolute bg-stam-bg-3 border border-stam-border z-30 duration-200 ${ProgGalvaEstoqueVisibility ? 'scale-100' : 'scale-0'}`}>
                <span
                    className="closeProgGalvaDiv material-symbols-outlined text-white absolute right-2 top-2 hover:bg-stam-border p-1.5 rounded-full cursor-pointer"
                    onClick={closeButton}
                >
                    close
                </span>
                <button
                    className="absolute border-stam-border border text-gray-400 rounded-full font-medium px-5 py-0.5 top-3 left-3 hover:bg-stam-orange hover:text-black hover:border-stam-orange"
                >
                    Editar
                </button>
                <button
                    className="absolute border-stam-orange border rounded-full font-medium px-5 py-0.5 top-3 right-12 bg-stam-orange buttonHover"
                >
                    Confirmar
                </button>
                <div className="flex justify-center items-center">
                    <span className="arrowIcon material-symbols-outlined mt-3 text-white mr-10 cursor-pointer hover:bg-stam-border rounded-full p-1.5">
                        arrow_back
                    </span>
                    <div className="flex items-center mt-3 space-x-1.5">
                        <span className="material-symbols-outlined progGalvaEstoqueIcon text-white">
                            list_alt
                        </span>
                        <p className="text-white font-thin text-lg">Programação Galvanoplastia</p>
                    </div>
                    <span className="arrowIcon material-symbols-outlined mt-3 text-white ml-11 cursor-pointer hover:bg-stam-border rounded-full p-1.5">
                        arrow_forward
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProgGalvaEstoque