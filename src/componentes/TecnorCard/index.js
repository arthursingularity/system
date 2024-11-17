import './tecnorcard.css';
import { useState } from 'react';
import axios from 'axios';

function TecnorCard({ data }) {
    const paCode = data.paCode;
    const paRecipe = data.paRecipe;
    const paWeight = data.paWeight;
    const quantity = data.quantity;
    const status = data.status;
    const etiqueta = data.label;

    const [isEtiquetaVisible, setIsEtiquetaVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editPaCode, setEditPaCode] = useState(paCode);
    const [editQuantity, setEditQuantity] = useState(quantity);
    const [codigo, setCodigo] = useState('');
    const [produto, setProduto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:4000/produtosacabados/codigo`, {
                params: { code: codigo }
            });
            setProduto(response.data);
        } catch (err) {
            setProduto(null);
        }
    };

    let bgColorClass;
    let iconAnimation;
    let Icon;

    if (status === "proximo") {
        bgColorClass = 'bg-stam-vermelho';
        Icon = 'arrow_forward';
    } else if (status === "concluido") {
        bgColorClass = ' bg-verde-lucro';
        Icon = 'check';
    } else if (status === "depois") {
        bgColorClass = 'bg-gray-400';
        Icon = 'arrow_forward';
    } else {
        bgColorClass = 'bg-azul-claro';
        iconAnimation = 'spinAnimation';
        Icon = 'cycle';
    }

    return (
        <div className="bg-stam-bg-3 rounded-2xl p-4 w-80 relative">
            <div className={`bg-stam-bg-7 p-5 rounded-xl relative`}>
                <div className={`etiquetaDiv text-white flex justify-center ${isEtiquetaVisible ? '' : 'hidden'} ${paCode === 0 ? 'hidden' : ''}`}>
                    <div className="font-light">
                        <p className='absolute left-4 top-3 text-2xl font-medium'>{quantity}</p>
                        <p className={'absolute left-4 top-10 font-light text-sm text-gray-400'}>{etiqueta}</p>
                        <div className={`rounded-lg w-7 h-7 absolute right-3 top-3 flex justify-center items-center ${bgColorClass}`}>
                            <span className={`cycleButton material-symbols-outlined ${iconAnimation} text-black`}>
                                {Icon}
                            </span>
                        </div>
                        <div className='flex justify-center'>
                            <p className={`text-center ${bgColorClass} text-black font-semibold text-lg rounded-lg px-3.5 py-0.5`}>
                                {paCode}
                            </p>
                        </div>
                        <p className='text-xl font-regular mt-2.5 text-center'>{data.paDescription}</p>
                        <div className='flex justify-center space-x-4 font-thin mt-1'>
                            <p>Receita: {paRecipe}</p>
                            <p>Peso: {paWeight}</p>
                        </div>
                        <div className='flex justify-center'>
                            <div className={`rounded-full w-28 bg-verde-lucro mt-3 h-7 text-black font-medium flex justify-center items-center ${status === "concluido" ? '' : 'hidden'}`}>
                                Concluído
                            </div>
                        </div>
                        <div className={`space-x-5 flex justify-center ${status === "concluido" ? 'hidden' : ''}`}>
                            <button
                                className={`border font-regular border-gray-500 rounded-full w-28 text-gray-400 hover:bg-gray-400 hover:border-gray-400 hover:text-black mt-3 h-7`}
                                onClick={() => {
                                    setIsEtiquetaVisible(false);
                                    setIsFormVisible(true);
                                }}
                            >
                                Redefinir
                            </button>
                            <button
                                className={`rounded-full w-28 bg-stam-orange mt-3 h-7 text-black font-medium buttonHover ${status === "produzindo" ? '' : 'hidden'}`}
                            >
                                Concluir
                            </button>
                        </div>
                    </div>
                </div>
                <form className={`startForm ${paCode > 0 ? 'hidden' : ''}`} onSubmit={handleSubmit}>
                    <h1 className='font-medium text-white text-2xl text-center'>Iniciar produção</h1>
                    <div className='space-x-2 flex justify-center mt-1'>
                        <div>
                            <div>
                                <label className='font-light text-gray-300'>Código</label>
                            </div>
                            <input
                                type='number'
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                className='rounded-lg bg-transparent border h-7 border-gray-500 w-20 font-light pl-2 outline-none hover:border-stam-orange caret-stam-orange text-white'
                            />
                        </div>
                        <div>
                            <div>
                                <label className='font-light text-gray-300'>Quantidade</label>
                            </div>
                            <input
                                type='number'
                                className='rounded-lg bg-transparent border border-gray-500 w-24 font-light pl-2 outline-none hover:border-stam-orange caret-stam-orange text-white'
                            />
                        </div>
                    </div>
                    <div className='flex justify-center mt-1.5'>
                        <button
                            className='rounded-full w-44 bg-stam-orange mt-3 h-7 text-black font-medium buttonHover'
                        >
                            Iniciar
                        </button>
                    </div>

                    {produto && (
                        <div className='text-white'>
                            <h3>Produto Encontrado:</h3>
                            <p><strong>Código:</strong> {produto.code}</p>
                            <p><strong>Descrição:</strong> {produto.description}</p>
                            <p><strong>Receita:</strong> {produto.recipe}</p>
                            <p><strong>Peso:</strong> {produto.weight}</p>
                        </div>
                    )}
                </form>
                <form className={`editForm ${isFormVisible ? '' : 'hidden'}`}>
                    <h1 className='font-medium text-white text-2xl text-center'>Editar produção</h1>
                    <div className='space-x-2 flex justify-center mt-1'>
                        <div>
                            <div>
                                <label className='font-light text-gray-300'>Código</label>
                            </div>
                            <input
                                type='number'
                                className='rounded-lg bg-transparent border h-7 border-gray-500 w-20 font-light pl-2 outline-none hover:border-stam-orange caret-stam-orange text-white'
                                value={editPaCode}
                                onChange={(e) => setEditPaCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>
                                <label className='font-light text-gray-300'>Quantidade</label>
                            </div>
                            <input
                                type='number'
                                className='rounded-lg bg-transparent border border-gray-500 w-24 font-light pl-2 outline-none hover:border-stam-orange caret-stam-orange text-white'
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-center mt-1.5'>
                        <button
                            type="submit"
                            className='rounded-full w-44 bg-stam-orange mt-3 h-7 text-black font-medium buttonHover'
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TecnorCard;
