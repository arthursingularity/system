import React, { useState } from "react";
import Navbar from "../../componentes/Navbar";
import ComponenteComercio from "../../componentes/ComponenteComercio";
import ComponentePs from "../../componentes/ComponentePs";

function Tecnor() {
    const [activeButton, setActiveButton] = useState("Comércio");

    React.useEffect(() => {
        document.title = "Tecnor";
    }, []);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <div>
            <Navbar />
            <div className="h-16"></div>
            <div className="flex justify-center">
                <div className="fixed">
                    <div className="comps flex justify-center mt-2 bg-stam-bg-3 rounded-full space-x-3">
                        <button
                            className={`font-light rounded-full w-32 py-1 ${
                                activeButton === "Comércio"
                                    ? "bg-stam-orange border-stam-orange text-black font-medium"
                                    : "border text-white hover:bg-stam-orange hover:border-stam-orange hover:text-black hover:font-medium"
                            }`}
                            onClick={() => handleButtonClick("Comércio")}
                        >
                            Comércio
                        </button>
                        <button
                            className={`font-light rounded-full w-32 py-1 ${
                                activeButton === "PS"
                                    ? "bg-stam-orange border-stam-orange text-black font-medium"
                                    : "border text-white hover:bg-stam-orange hover:border-stam-orange hover:text-black hover:font-medium"
                            }`}
                            onClick={() => handleButtonClick("PS")}
                        >
                            PS
                        </button>
                    </div>
                </div>
            </div>
            <span className="material-symbols-rounded controleTecnor fixed left-6 bottom-6 bg-dark-bg border rounded-full cursor-pointer text-white hover:bg-stam-orange hover:border-stam-orange">
                build
            </span>
            <button className="fixed right-6 bottom-6 text-white font-light border w-32 py-1 rounded-full bg-dark-bg hover:bg-verde-lucro hover:border-verde-lucro hover:text-black hover:font-medium">Concluir</button>
            <div className="flex justify-center">
                <div className="fixed bg-stam-bg-3 rounded-full px-6 py-2 bottom-6">
                    <ul className="flex space-x-10 font-light text-white">
                        <li>COMÉRCIO: <span className="text-stam-orange">0000</span></li>
                        <li>PS: <span className="text-stam-orange">0000</span></li>
                        <li>TOTAL: <span className="text-stam-orange">00000</span></li>
                    </ul>
                </div>
            </div>
            <ComponenteComercio visibilidade={activeButton === "Comércio"}/>
            <ComponentePs visibilidade={activeButton === "PS"}/>
        </div>
    );
}

export default Tecnor;

