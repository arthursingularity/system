import { useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import './embalagem.css'

function Embalagem() {
    useEffect(() => {
        document.title = "Embalagem";
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="embalagemDiv absolute bg-estoque-bg p-5">
                    <div className="flex justify-center">
                        <div className="flex justify-center bg-stam-bg-3 p-3 rounded-full space-x-2.5">
                            <input
                                className="border border-stam-border w-36 h-7 bg-stam-bg-3 rounded-full outline-none text-white font-light pl-8 caret-stam-orange"
                                placeholder="Código"
                                >
                            </input>
                            <button className="consultarButton bg-stam-orange rounded-full font-medium px-5">Consultar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Embalagem;
