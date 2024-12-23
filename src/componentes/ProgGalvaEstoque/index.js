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
                <div className="flex justify-center">
                    <div className="progGalvaTableDiv mt-5 rounded-xl border border-tableBorder overflow-hidden">
                        <table className="w-full">
                            <tr className="text-white font-regular text-lg bg-tableHeadBg border-b border-tableBorder">
                                <th className="px-6 py-2 border-r border-tableBorder font-normal">
                                    <p>Segunda-feira</p>
                                    <p className="font-light text-base leading-tight -mt-0.5">23/11</p>
                                </th>
                                <th className="px-8 border-r border-tableBorder font-normal">
                                    <p>Terça-feira</p>
                                    <p className="font-light text-base leading-tight -mt-0.5">24/11</p>
                                </th>
                                <th className="px-7 border-r border-tableBorder font-normal">
                                    <p>Quarta-feira</p>
                                    <p className="font-light text-base leading-tight -mt-0.5">25/11</p>
                                </th>
                                <th className="px-8 border-r border-tableBorder font-normal">
                                    <p>Quinta-feira</p>
                                    <p className="font-light text-base leading-tight -mt-0.5">26/11</p>
                                </th>
                                <th className="px-8 font-normal">
                                    <p>Sexta-feira</p>
                                    <p className="font-light text-base leading-tight -mt-0.5">27/11</p>
                                </th>
                            </tr>
                            <tr className="text-white font-thin border-b border-tableBorder">
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                            </tr>
                            <tr className="text-white font-thin border-b border-tableBorder">
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                            </tr>
                            <tr className="text-white font-thin border-b border-tableBorder">
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                            </tr>
                            <tr className="text-white font-thin border-b border-tableBorder">
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                            </tr>
                            <tr className="text-white font-thin">
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center border-r border-tableBorder px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                                <td className="text-center px-2 pt-3 pb-2">ESPELHO 503 BUZIOS INOX 430 S/PVC - BRANCO</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgGalvaEstoque