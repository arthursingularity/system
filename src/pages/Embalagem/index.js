import Navbar from "../../componentes/Navbar";
import './embalagem.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import TecnorCard from "../../componentes/TecnorCard";

function Embalagem() {
    const { code } = useParams();
    const [production, setProduction] = useState(null);
    const [error, setError] = useState(null)
    const [produtosAcabados, setProdutosAcabados] = useState([]);
    const [filteredProdutos, setFilteredProdutos] = useState([]);
    const [searchCodigo, setSearchCodigo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [produtoAcabadoList, setProdutoAcabadoList] = useState(false)
    const [updateProdutoAcabado, setUpdateProdutoAcabado] = useState(false)
    const [registerProdutoAcabadoList, setRegisterProdutoAcabadoList] = useState(false)
    const [produtoAtual, setProdutoAtual] = useState(null);
    const [registerCode, setRegisterCode] = useState('');
    const [generateProductionCode, setGenerateProductionCode] = useState('');
    const [registerRecipe, setRegisterRecipe] = useState('');
    const [registerWeight, setRegisterWeight] = useState('');
    const [registerDescription, setRegisterDescription] = useState('');
    const location = useLocation();
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [machineNumber, setMachineNumber] = useState()
    const [loggedUserName, setLoggedName] = useState(null);
    const [loggedUserLogin, setLoggedLogin] = useState(null);
    const [isMoved, setIsMoved] = useState(false);
    const [circleText, setCircleText] = useState('CM');
    const [titleText, setTitleText] = useState('Comércio');

    useEffect(() => {
        const fetchProduction = async () => {
            console.log("Fetching production with code:", code);
            try {
                const response = await axios.get(`http://localhost:4000/embalagem/${code}`);
                console.log("Response data:", response.data);
                setProduction(response.data);
            } catch (err) {
                console.log("Error fetching production:", err);
                setError(err.response ? err.response.data.message : "Erro ao buscar a produção.");
            }
        };

        fetchProduction();
    }, [code]);

    const { comercio = [], ps = [] } = production ? production.cards : { comercio: [], ps: [] };

    useEffect(() => {
        document.title = "CPT - Embalagem";

        const loggedId = localStorage.getItem('loggedUserId');
        const loggedName = localStorage.getItem('loggedName');
        const loggedNameLogin = localStorage.getItem('login');

        setLoggedUserId(loggedId);
        setLoggedName(loggedName);
        setLoggedLogin(loggedNameLogin);

        axios.get('http://localhost:4000/produtosacabados')
            .then(response => {
                setProdutosAcabados(response.data);
                setFilteredProdutos(response.data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = produtosAcabados
            .filter(produto =>
                produto.code.toString().includes(searchCodigo) &&
                produto.description.toLowerCase().includes(descricao.toLowerCase())
            )
            .sort((a, b) => a.description.localeCompare(b.description));

        setFilteredProdutos(filtered);
    }, [searchCodigo, descricao, produtosAcabados]);

    const codeUrl = location.pathname.startsWith('/embalagem/') && location.pathname.split('/').length > 2

    const handleSearchCodigoChange = (e) => {
        setSearchCodigo(e.target.value);
    };

    const handleCodigoChange = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 5) {
            setProdutoAtual({ ...produtoAtual, code: newValue });
        }
    };

    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value);
    };

    function toggleProdutoAcabadoListVisibility() {
        setProdutoAcabadoList(!produtoAcabadoList)
    }

    function toggleUpdateProdutoAcabadoVisibility() {
        setUpdateProdutoAcabado(!updateProdutoAcabado)
    }

    function toggleRegisterProdutoAcabadoVisibility() {
        setRegisterProdutoAcabadoList(!registerProdutoAcabadoList)
    }

    function removeInvisibleClass() {
        document.querySelector('.invisibleDiv').classList.remove('invisible');
    }

    function removeInvisibleAllCardsClass() {
        document.querySelector('.allCardsDiv2').classList.remove('invisible');
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                if (updateProdutoAcabado) {
                    removeInvisibleClass();
                    toggleUpdateProdutoAcabadoVisibility();
                } else if (produtoAcabadoList) {
                    toggleProdutoAcabadoListVisibility();
                    removeInvisibleAllCardsClass()
                } if (registerProdutoAcabadoList) {
                    removeInvisibleAllCardsClass()
                    toggleRegisterProdutoAcabadoVisibility()
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [produtoAcabadoList, updateProdutoAcabado, registerProdutoAcabadoList]);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put('http://localhost:4000/produtosacabados/update', {
                code: produtoAtual.code,
                description: produtoAtual.description,
                recipe: produtoAtual.recipe,
                weight: produtoAtual.weight
            });

            console.log(response.data);
            window.alert("Produto atualizado com sucesso!")
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        const produtoData = {
            code: registerCode,
            recipe: registerRecipe,
            weight: registerWeight,
            description: registerDescription.toUpperCase(),
        };

        try {
            const response = await axios.post('http://localhost:4000/produtosacabados', produtoData);

            console.log(response.data.message);

            setRegisterCode('');
            setRegisterRecipe('');
            setRegisterWeight('');
            setRegisterDescription('');

            console.log(response.data);
            window.alert("Produto cadastrado com sucesso!")
            window.location.reload();
        } catch (error) {
            console.error('Error in registering produto acabado:', error.response?.data?.message || error.message); // Lida com erros
        }
    };

    const handleGenerateProductionCode = async () => {
        try {
            const response = await axios.post('http://localhost:4000/generateproductioncode', {
                loggedUserId,
                loggedUserName,
                loggedUserLogin,
                machineNumber
            });
            const generatedCode = response.data.code;

            alert(`Código de produção gerado com sucesso: ${generatedCode}`);

            setGenerateProductionCode(generatedCode);
        } catch (error) {
            console.error('Erro ao gerar o código de produção:', error);

            if (error.response && error.response.status === 400 && error.response.data.message === "Erro, código de produção já existe.") {
                alert("Erro: Código de produção já existe. Por favor, tente novamente mais tarde.");
            } else {
                alert('Erro ao gerar o código de produção. Tente novamente.');
            }
        }
    };

    const handleDeleteProdutoAcabado = async (code) => {
        if (!window.confirm("Tem certeza que deseja excluir este produto acabado?")) {
            return;
        }

        try {
            const response = await axios.delete('http://localhost:4000/produtosacabados', {
                data: { code }
            });

            alert(response.data.message);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao deletar o produto acabado:', error.response?.data?.message || error.message);
            alert('Erro ao deletar o produto. Tente novamente.');
        }
    };

    function handleCircleClick() {
        setIsMoved(!isMoved);
        setCircleText(isMoved ? 'CM' : 'PS');
        setTitleText(isMoved ? 'Comércio' : 'PS')
    }

    return (
        <div>
            <Navbar />
            <div className="tecnorControlProduction absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {location.pathname === '/embalagem' && (
                    <div className="bg-estoque-bg p-4 rounded-3xl">
                        <div className="bg-stam-bg-3 rounded-2xl p-4">
                            <p className="text-white font-regular text-2xl text-center">Controle de Produção da Tecnor</p>
                            <div className="flex space-x-4 mt-4">
                                <div className="bg-stam-bg-7 p-6 rounded-xl">
                                    <p className="font-light text-white text-lg">Selecionar produção</p>
                                    <input
                                        type="number"
                                        placeholder="Código de produção"
                                        className="border mt-3 border-gray-400 text-white w-44 font-light bg-transparent rounded-lg caret-stam-orange outline-none hover:border-stam-orange pl-2 py-1"
                                        onChange={(e) => {
                                            if (e.target.value.length > 10) {
                                                e.target.value = e.target.value.slice(0, 10);
                                            }
                                        }}
                                    />
                                    <div>
                                        <button className="bg-stam-orange mt-4 buttonHover rounded-full font-medium py-1 w-44">Confirmar</button>
                                    </div>
                                </div>
                                <div className="bg-stam-bg-7 p-6 rounded-xl flex">
                                    <div className="">
                                        <p className="font-light text-white text-lg">Gerar produção</p>
                                        <div className="mt-3">
                                            <input
                                                className="border border-gray-400 text-white w-44 font-light bg-transparent rounded-lg caret-stam-orange outline-none hover:border-stam-orange pl-2 py-1"
                                                placeholder="Máquina"
                                                onChange={(e) => {
                                                    if (e.target.value.length > 1) {
                                                        e.target.value = e.target.value.slice(0, 1);
                                                    }
                                                    setMachineNumber(e.target.value);
                                                }}
                                            ></input>
                                        </div>
                                        <button
                                            className="bg-stam-orange mt-4 buttonHover rounded-full font-medium py-1 w-44"
                                            onClick={handleGenerateProductionCode}
                                        >
                                            Gerar
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
            {codeUrl && (
                <div className="bottomBar flex justify-center">
                    <div className="crudSection flex justify-center items-center h-screen absolute">
                        <div className={`updateProdutoAcabado flex justify-center items-center fixed z-50 transform transition-transform duration-200 drop-shadow-xl ${updateProdutoAcabado ? 'scale-100' : 'scale-0'}`}>
                            <div className="bg-estoque-bg p-4 rounded-3xl relative">
                                <span
                                    className="material-symbols-outlined closeButton absolute right-3 top-3 p-2 text-white cursor-pointer hover:bg-stam-bg-4 rounded-lg"
                                    onClick={() => {
                                        removeInvisibleClass();
                                        toggleUpdateProdutoAcabadoVisibility();
                                    }}
                                >
                                    close
                                </span>
                                <div className="bg-stam-bg-3 p-4 rounded-2xl">
                                    <form onSubmit={handleUpdateSubmit}>
                                        <p className="text-white font-regular text-2xl text-center">Atualizar Produto</p>
                                        <div className="bg-stam-bg-7 p-4 rounded-xl mt-4">
                                            <div className="space-x-4 flex">
                                                <div className="block">
                                                    <label className="text-gray-300 absolute font-light">Código</label>
                                                    <input
                                                        type="number"
                                                        value={produtoAtual ? produtoAtual.code : ""}
                                                        onChange={handleCodigoChange}
                                                        className="bg-transparent border mt-6 border-gray-400 w-16 rounded-lg outline-none caret-stam-orange text-white pl-2 py-0.5 font-light hover:border-stam-orange"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-300 absolute font-light">Receita</label>
                                                    <input
                                                        type="number"
                                                        value={produtoAtual ? produtoAtual.recipe : ""}
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;

                                                            if (newValue.length <= 3) {
                                                                setProdutoAtual({ ...produtoAtual, recipe: newValue });
                                                            }
                                                        }}
                                                        className="bg-transparent border mt-6 border-gray-400 w-14 rounded-lg outline-none caret-stam-orange text-white pl-2 py-0.5 font-light hover:border-stam-orange"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-300 absolute font-light">Peso</label>
                                                    <input
                                                        placeholder="Peso"
                                                        value={produtoAtual ? produtoAtual.weight : ""}
                                                        onChange={(e) => setProdutoAtual({ ...produtoAtual, weight: e.target.value })}
                                                        className="bg-transparent border mt-6 border-gray-400 w-28 rounded-lg outline-none caret-stam-orange text-white pl-2 py-0.5 font-light hover:border-stam-orange"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <label className="text-gray-300 absolute font-light">Descrição</label>
                                                <input
                                                    placeholder="Descrição"
                                                    value={produtoAtual ? produtoAtual.description : ""}
                                                    onChange={(e) => setProdutoAtual({ ...produtoAtual, description: e.target.value })}
                                                    className="descriptionPaDescription mt-6 bg-transparent border border-gray-400 rounded-lg outline-none caret-stam-orange text-white pl-2 py-0.5 font-light hover:border-stam-orange"
                                                    style={{ textTransform: 'uppercase' }}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="updatePaButton buttonHover mt-4 font-medium bg-stam-orange rounded-full py-1"
                                            >
                                                Atualizar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={`produtoAcabadoList flex justify-center items-center fixed z-30 transform transition-transform duration-200 ${produtoAcabadoList ? 'scale-100' : 'scale-0'}`}>
                            <div className="bg-estoque-bg p-4 rounded-3xl">
                                <div className="bg-stam-bg-3 p-4 h-96 rounded-2xl flex justify-center">
                                    <div className={`invisibleDiv flex justify-center relative`}>
                                        <span
                                            className="material-symbols-outlined closeButton absolute right-0 top-0 p-2 text-white cursor-pointer hover:bg-stam-bg-4 rounded-lg"
                                            onClick={() => {
                                                document.querySelector('.allCardsDiv2').classList.remove('invisible');
                                                toggleProdutoAcabadoListVisibility()
                                            }}
                                        >
                                            close
                                        </span>
                                        <div className={`p-3 rounded-full bg-stam-bg-7 items-center space-x-2 absolute flex`}>
                                            <div className="relative flex items-center">
                                                <span className="material-symbols-outlined absolute left-1 text-gray-500 text-2xl z-40">
                                                    tag
                                                </span>
                                                <input
                                                    placeholder="Código"
                                                    type="number"
                                                    value={searchCodigo}
                                                    onChange={(e) => {
                                                        if (e.target.value.length <= 5) {
                                                            handleSearchCodigoChange(e);
                                                        }
                                                    }}
                                                    className="bg-transparent border border-gray-500 rounded-full py-0.5 font-light pl-8 outline-none caret-stam-orange text-white w-24 hover:border-stam-orange"
                                                />
                                            </div>
                                            <div className="relative flex items-center">
                                                <span className="material-symbols-outlined absolute left-1 text-gray-500 text-2xl z-40">
                                                    search
                                                </span>
                                                <input
                                                    placeholder="Descrição"
                                                    value={descricao}
                                                    onChange={handleDescricaoChange}
                                                    className="bg-transparent border border-gray-500 rounded-full py-0.5 font-light pl-8 outline-none caret-stam-orange text-white hover:border-stam-orange"
                                                />
                                            </div>
                                        </div>
                                        <div className="paList rounded-xl border border-stam-border overflow-y-auto">
                                            {filteredProdutos.length > 0 ? (
                                                <table className="text-white">
                                                    <thead>
                                                        <tr className='bg-stam-bg-7 border-b-stam-border border-b'>
                                                            <th className="py-2 font-light">Código</th>
                                                            <th className="font-light">Descrição</th>
                                                            <th className="font-light">Receita</th>
                                                            <th className="font-light">Peso</th>
                                                            <th className="font-light">Ação</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredProdutos.map(produtoAcabado => (
                                                            <tr key={produtoAcabado._id} className={`border-t border-stam-border hover:bg-stam-bg-5 font-thin relative ${filteredProdutos.length < 7 ? 'border-b' : ''}`}>
                                                                <td className="px-5 py-1.5">{produtoAcabado.code}</td>
                                                                <td className="px-5 font-regular">{produtoAcabado.description}</td>
                                                                <td className="px-5">{produtoAcabado.recipe}</td>
                                                                <td className="px-5 pl-6">{produtoAcabado.weight}</td>
                                                                <td className="px-5 space-x-2">
                                                                    <button
                                                                        className="bg-stam-orange buttonHover rounded-lg text-black px-2.5 font-medium"
                                                                        onClick={() => {
                                                                            setProdutoAtual(produtoAcabado);
                                                                            document.querySelector('.invisibleDiv').classList.add('invisible');
                                                                            toggleUpdateProdutoAcabadoVisibility();
                                                                        }}
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                    <button
                                                                        className="bg-stam-vermelho buttonHover rounded-lg text-black px-2.5 font-medium"
                                                                        onClick={() => handleDeleteProdutoAcabado(produtoAcabado.code)}
                                                                    >
                                                                        Excluir
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="py-4 px-24 font-light text-gray-400">
                                                    Produto Acabado não encontrado.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`registerProdutoAcabado flex justify-center items-center fixed z-30 transform transition-transform duration-200 ${registerProdutoAcabadoList ? 'scale-100' : 'scale-0'}`}>
                            <div className="bg-estoque-bg p-4 rounded-3xl relative">
                                <span
                                    className="material-symbols-outlined closeButton absolute right-3 top-3 p-2 text-white cursor-pointer hover:bg-stam-bg-4 rounded-lg"
                                    onClick={() => {
                                        toggleRegisterProdutoAcabadoVisibility();
                                        document.querySelector('.allCardsDiv2').classList.remove('invisible');
                                    }}
                                >
                                    close
                                </span>
                                <div className="bg-stam-bg-3 p-4 rounded-2xl flex justify-center">
                                    <form onSubmit={handleRegisterSubmit}>
                                        <p className="text-white font-regular text-2xl text-center">Cadastrar Produto</p>
                                        <div className="bg-stam-bg-7 p-4 rounded-xl mt-4">
                                            <div className="space-x-4 flex">
                                                <div className="block">
                                                    <label className="text-gray-300 absolute font-light">Código</label>
                                                    <input
                                                        type="number"
                                                        value={registerCode}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value.length <= 5) {
                                                                setRegisterCode(value);
                                                            }
                                                        }}
                                                        className="bg-transparent border mt-6 border-gray-400 w-16 rounded-lg outline-none caret-stam-orange text-white pl-2 py-0.5 font-light hover:border-stam-orange"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-300 absolute font-light">Receita</label>
                                                    <input
                                                        type="number"
                                                        value={registerRecipe}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value.length <= 3) {
                                                                setRegisterRecipe(value);
                                                            }
                                                        }}
                                                        className="bg-transparent border mt-6 border-gray-400 w-14 rounded-lg outline-none caret-stam-orange text-white pl-2 py-0.5 font-light hover:border-stam-orange"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-300 absolute font-light">Peso</label>
                                                    <input
                                                        value={registerWeight}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value.length <= 11) {
                                                                setRegisterWeight(value);
                                                            }
                                                        }}
                                                        className="bg-transparent border mt-6 border-gray-400 w-28 rounded-lg outline-none caret-stam-orange text-white pl-2 py-0.5 font-light hover:border-stam-orange"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <label className="text-gray-300 absolute font-light">Descrição</label>
                                                <input
                                                    value={registerDescription}
                                                    onChange={(e) => setRegisterDescription(e.target.value)}
                                                    className="descriptionPaDescription mt-6 bg-transparent border border-gray-400 rounded-lg outline-none caret-stam-orange text-white pl-2 py-0.5 font-light hover:border-stam-orange"
                                                    style={{ textTransform: 'uppercase' }}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="updatePaButton buttonHover mt-4 font-medium bg-stam-orange rounded-full py-1"
                                            >
                                                Cadastrar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center fixed z-50 bottom-4 bg-dark-bg p-3 rounded-full">
                        <div className="p-3 rounded-full bg-stam-bg-3 flex justify-center items-center space-x-2">
                            <span
                                className="material-symbols-outlined addButton p-0.5 bg-stam-orange rounded-full cursor-pointer buttonHover"
                                onClick={() => {
                                    toggleRegisterProdutoAcabadoVisibility()
                                    document.querySelector('.allCardsDiv2').classList.add('invisible');
                                }}
                            >
                                add
                            </span>
                            <span
                                className="material-symbols-outlined addButton p-0.5 bg-stam-orange rounded-full cursor-pointer buttonHover"
                                onClick={() => {
                                    toggleProdutoAcabadoListVisibility()
                                    document.querySelector('.allCardsDiv2').classList.add('invisible');
                                }}
                            >
                                list
                            </span>
                            <div
                                className={`changeComPsDiv border border-gray-600 w-16 h-9 rounded-full relative flex items-center hover:border-stam-orange cursor-pointer ${isMoved ? 'border-stam-orange' : ''}`}
                                onClick={handleCircleClick}
                            >
                                <div
                                    className={`comCircle absolute bg-gray-600 rounded-full left-0 flex justify-center items-center text-white font-light text-lg transition-transform duration-200 ${isMoved ? 'translate-x-7 bg-stam-orange' : ''}`}
                                >
                                    {circleText}
                                </div>
                            </div>
                            <button
                                className="text-gray-400 ml-36 border border-gray-600 rounded-full text-lg font-regular px-5 h-9 hover:bg-gray-500 hover:text-black"
                                onClick={() => window.location.reload()}
                            >
                                Atualizar
                            </button>
                            <div className="flex text-white font-light bg-stam-bg-7 py-1.5 px-4 rounded-full space-x-4">
                                <p>COMÉRCIO: <strong className="font-medium text-stam-orange">{production?.comProduction}</strong></p>
                                <p>PS: <strong className="font-medium text-stam-orange">{production?.psProduction}</strong></p>
                                <p>TOTAL: <strong className="font-medium text-stam-orange">{production?.totalProduction}</strong></p>
                            </div>
                            <button className="font-medium bg-stam-orange rounded-full py-1.5 px-7 buttonHover">Finalizar</button>
                        </div>
                    </div>
                </div>
            )}
            {codeUrl && (
                <div className="flex justify-center pb-28 pt-24">
                    <div className="allCardsDiv bg-estoque-bg p-2 rounded-3xl flex justify-center">
                        <div className="allCardsDiv2 relative">
                            <div className="absolute top-5 left-5 rounded-xl flex">
                                <div>
                                    <h1 className="font-regular text-stam-orange text-xl leading-none">Máquina {production?.code?.slice(-1)}</h1>
                                    <h1 className="font-thin text-white text-lg leading-none mt-0.5">{production?.code}</h1>
                                </div>
                            </div>
                            <img src="/imagens/stamS.png" className="w-5 absolute top-3 right-5" />
                            <h1 className="font-regular text-white text-4xl flex justify-center mt-5">{titleText}</h1>
                            {!titleText.includes("PS") && (
                                <div className="comercioDiv">
                                    <div className="grid grid-cols-[repeat(3,_1fr)] gap-x-[0.1rem] gap-y-[0.1rem] mt-5">
                                        {comercio.map((item) => (
                                            <div className="p-3" key={item.id.$oid}>
                                                <TecnorCard data={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {titleText.includes("PS") && (
                                <div className="psDiv">
                                    <div className="grid grid-cols-[repeat(3,_1fr)] gap-x-[0.1rem] gap-y-[0.1rem] mt-5">
                                        {ps.map((item) => (
                                            <div className="p-3 flex" key={item.id.$oid}>
                                                <TecnorCard data={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Embalagem;