import React from "react";
function Erro404() {

    React.useEffect(() => {
        document.title = "Página não encontrada";
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <img src="/imagens/systemlogo.png" className="w-36 absolute top-16"/>
            </div>
            <div className="text-white flex h-screen flex-col justify-center items-center space-y-5">
                <div className="font-light tracking-wide">Desculpe! Não conseguimos encontrar a página que você está procurando.</div>
                <a href="/">
                    <button type="button" className="tracking-wide py-1 px-6 text-texos-green border border-solid border-texos-green font-medium rounded-full visible hover:bg-stam-orange hover:text-black hover:border-stam-orange">
                        Página inicial
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Erro404