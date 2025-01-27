import Navbar from "../../componentes/Navbar"
import { useState, useEffect } from "react";
import './programacaoEstamparia.css'

function ProgramacaoEstamparia() {

    useEffect(() => {
        document.title = "Controle Produção Estamparia";
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="progEstDiv bg-estoque-bg absolute border p-4 border-gray-700">
                    <div className="flex justify-center">
                        <div className="flex justify-center text-white p-3 bg-stam-bg-3 border border-stam-border rounded-full absolute">
                            <div className="flex space-x-2.5">
                                <div className="bg-stam-orange rounded-full flex justify-center items-center w-8 h-8 buttonHover">
                                    <img
                                        src="./imagens/excelIcon.svg"
                                        className="w-5 h-5"
                                    />
                                </div>
                                <span
                                    className="material-symbols-outlined bg-stam-orange text-black rounded-full p-1 buttonHover flex items-center"
                                >view_list
                                </span>
                                <div className="flex items-center space-x-1.5 px-3">
                                    <span className="material-symbols-outlined SuprimentosBoxIcon text-white">
                                        terminal
                                    </span>
                                    <p className="text-white font-thin text-lg">Controle Produção Estamparia</p>
                                </div>
                                <span
                                    className="material-symbols-outlined bg-stam-orange text-black rounded-full p-1 buttonHover flex items-center"
                                >receipt_long
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-stam-bg-3 border border-stam-border p-2 rounded-xl mt-20 px-2 absolute">
                        <p className="text-white font-regular text-center text-xl mt-1">Prioridades</p>
                        <div className="border mt-3 border-stam-border rounded-lg overflow-hidden">
                            <table className="text-white">
                                <thead className="font-thin bg-gray-700">
                                    <tr>
                                        <th className="pb-1 pt-1 border-r border-stam-border">Componente</th>
                                        <th className="pb-1 pt-1 px-5 border-r border-stam-border">Dias Est Total</th>
                                        <th className="pb-1 pt-1 px-5 border-r border-stam-border">Dias Est Prim</th>
                                        <th className="pb-1 pt-1 px-5 border-r border-stam-border">Dias Est Secund</th>
                                        <th className="pb-1 pt-1 px-5 border-r border-stam-border">Saldo Bobina</th>
                                        <th className="pb-1 pt-1 px-5 border-r border-stam-border">Compra</th>
                                        <th className="pb-1 pt-1 px-5 border-stam-border">Programado</th>
                                    </tr>
                                </thead>
                                <tbody className="font-light text-sm">
                                    <tr className="buttonHover hover:bg-stam-bg-4">
                                        <td className="px-5 py-1.5 border-stam-border border border-l-0">CADEIRA 900/1005/05T/06/07/25/1500/1940</td>
                                        <td className="text-center border-stam-border border">6</td>
                                        <td className="text-center border-stam-border border">4</td>
                                        <td className="text-center border-stam-border border">2</td>
                                        <td className="text-center border-stam-border border border-r-0 text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border border-r-0">2000</td>
                                        <td className="text-center border-stam-border border border-r-0">1.000.000</td>
                                    </tr>
                                    <tr className="buttonHover hover:bg-stam-bg-4 border-b border-stam-border">
                                        <td className="px-5 py-1.5 border-stam-border border border-l-0">CAIXA 803/803 PIV/1801</td>
                                        <td className="text-center border-stam-border border">3</td>
                                        <td className="text-center border-stam-border border">3</td>
                                        <td className="text-center border-stam-border border text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border border-r-0">878</td>
                                        <td className="text-center border-stam-border border border-r-0">3000</td>
                                        <td className="text-center border-stam-border border border-r-0 text-stam-vermelho">0</td>
                                    </tr>
                                    <tr className="buttonHover hover:bg-stam-bg-4 border-b border-stam-border">
                                    <td className="px-5 py-1.5 border-stam-border border-r">CAIXA 1006 WC</td>
                                        <td className="text-center border-stam-border text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border-l text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border-l text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border-l">1000</td>
                                        <td className="text-center border-stam-border border-l">4000</td>
                                    </tr>
                                    <tr className="buttonHover hover:bg-stam-bg-4">
                                        <td className="px-5 py-1.5 border-stam-border border-r">TAMPA 1006 WC</td>
                                        <td className="text-center border-stam-border border-l text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border-l text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border-l text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border-l text-stam-vermelho">0</td>
                                        <td className="text-center border-stam-border border-l">1000</td>
                                        <td className="text-center border-stam-border border-l">4000</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramacaoEstamparia