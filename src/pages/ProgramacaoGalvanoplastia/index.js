import Navbar from "../../componentes/Navbar"
import { useEffect, useState, useRef } from "react";
import './ProgramacaoGalva.css'
import SearchProgGalvaSuggestion from "../../componentes/SearchProgGalvaSuggestion";

function ProgramacaoGalvanoplastia() {
    const [currentWeek, setCurrentWeek] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [animationDirection, setAnimationDirection] = useState('');
    const [isUpdateProgVisible, setIsUpdateProgVisible] = useState(false)
    const [isFiltrar, setIsFiltrar] = useState(false)
    const [isCreateProg, setIsCreateProg] = useState(false)
    const [isBlurred, setIsBlurred] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isSearchSuggestionVisible, setIsSearchSuggestionVisible] = useState(true);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const inputDescriptionRef = useRef(null);
    const [activeFilterIndex, setActiveFilterIndex] = useState(null);

    useEffect(() => {
        document.title = "Programação Galvanoplastia";
        setCurrentWeek(getWeekDays(currentDate));

        const handleKeyDown = (e) => {
            if (isSearchSuggestionVisible) {
                if (e.key === 'Enter') {
                    const items = document.querySelectorAll('.suggestion-item-prog-galva');
                    const selectedItem = Array.from(items).find(item => item.classList.contains('bg-gray-700'));

                    if (selectedItem) {
                        const descricao = selectedItem.textContent || '';
                        handleSuggestionClick(descricao);
                    }
                } else if (e.key === 'ArrowDown') {
                    setSelectedItemIndex((prevIndex) => {
                        const items = document.querySelectorAll('.suggestion-item-prog-galva');
                        const newIndex = (prevIndex + 1) % items.length;
                        items.forEach((item, index) => {
                            item.classList.toggle('bg-gray-700', index === newIndex);
                        });
                        return newIndex;
                    });
                } else if (e.key === 'ArrowUp') {
                    setSelectedItemIndex((prevIndex) => {
                        const items = document.querySelectorAll('.suggestion-item-prog-galva');
                        const newIndex = (prevIndex - 1 + items.length) % items.length;
                        items.forEach((item, index) => {
                            item.classList.toggle('bg-gray-700', index === newIndex);
                        });
                        return newIndex;
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchValue, isSearchSuggestionVisible]);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
    };

    function toggleUpdateProg() {
        setIsUpdateProgVisible(!isUpdateProgVisible)
        setIsBlurred(!isBlurred);
    }

    function toggleCreateProg(day = '', date = '') {
        setSelectedDay(day);
        setSelectedDate(date);
        setIsCreateProg(!isCreateProg);
        setIsBlurred(!isBlurred);
    }

    const getWeekDays = (date) => {
        const week = [];
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
        for (let i = 0; i < 5; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            week.push(day);
        }
        return week;
    };

    const irParaSemanaAnterior = () => {
        setAnimationDirection('slide-right');
        setTimeout(() => {
            const prevDate = new Date(currentDate);
            prevDate.setDate(currentDate.getDate() - 7);
            setCurrentDate(prevDate);
            setCurrentWeek(getWeekDays(prevDate));
            setAnimationDirection('');
        }, 250);
    };

    const irParaProximaSemana = () => {
        setAnimationDirection('slide-left');
        setTimeout(() => {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + 7);
            setCurrentDate(nextDate);
            setCurrentWeek(getWeekDays(nextDate));
            setAnimationDirection('');
        }, 250);
    };

    const handleSuggestionClick = (descricao) => {
        navigator.clipboard.writeText(descricao)
            .then(() => {
                setSearchValue(descricao);
                setIsSearchSuggestionVisible(false);
            })
            .catch(err => {
                console.error('Falha ao copiar o texto: ', err);
            });
    };

    const handleDescricaoChange = (e) => {
        setIsSearchSuggestionVisible(true);
        setSearchValue(e.target.value.toUpperCase());
    };

    const handleClearInput = () => {
        setSearchValue('')
    };

    function toggleFiltar(index) {
        setActiveFilterIndex(prevIndex => (prevIndex === index ? null : index));
    }

    return (
        <div>
            <Navbar />
            <div className={`createProg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transform transition-transform duration-150 ${isCreateProg ? 'scale-100' : 'scale-0'}`}>
                {searchValue && isSearchSuggestionVisible && <SearchProgGalvaSuggestion searchValue={searchValue} onSuggestionClick={handleSuggestionClick} />}
                <div className="bg-estoque-bg p-3 rounded-2xl border border-stam-border relative">
                    <h1 className="text-white font-regular text-xl text-center mt-2">Programar componente</h1>
                    <span
                        className="closeUpdateProg material-symbols-outlined absolute right-2 top-2 text-white rounded-lg hover:bg-gray-600 p-1.5 cursor-pointer"
                        onClick={() => toggleCreateProg()}
                    >
                        close
                    </span>
                    <div className="bg-stam-bg-3 p-4 mt-6 border border-stam-border rounded-lg">
                        <div className="text-white flex space-x-3 justify-center font-light">
                            <p className="text-lg">{selectedDay || 'Dia da semana'}</p>
                            <p className="text-lg">-</p>
                            <p className="text-lg">{selectedDate || 'Data'}</p>
                        </div>
                        <div className="mt-4 relative">
                            <div className="flex items-center">
                                {searchValue && (
                                    <span
                                        className="clearCreateProgGalvaInput material-symbols-outlined p-1.5 absolute text-white hover:bg-gray-600 cursor-pointer"
                                        onClick={handleClearInput}
                                    >
                                        close
                                    </span>
                                )}
                                <input
                                    value={searchValue}
                                    onChange={handleDescricaoChange}
                                    onKeyDown={handleKeyDown}
                                    ref={inputDescriptionRef}
                                    className="desciptionCreateProgGalvaInput rounded-lg bg-transparent border border-stam-border outline-none text-white pl-1.5 pr-8 font-light caret-stam-orange hover:border-stam-orange h-8"
                                    placeholder="Descrição"
                                />
                            </div>
                            <div className="mt-2 space-x-2">
                                <input
                                    className="updateProgGalvaInput rounded-lg bg-transparent border border-stam-border outline-none text-white pl-1.5 font-light caret-stam-orange hover:border-stam-orange h-8"
                                    placeholder="Acabamento"
                                />
                                <input
                                    type="number"
                                    className="prioridadeInput rounded-lg bg-transparent border border-stam-border outline-none text-white pl-1.5 font-light caret-stam-orange hover:border-stam-orange h-8"
                                    placeholder="Prioridade"
                                />
                            </div>
                        </div>
                        <div className="mt-7 flex justify-center">
                            <button
                                className="rounded-lg bg-stam-orange w-60 h-8 font-medium text-black buttonHover"
                            >Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`updateProgDiv fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transform transition-transform duration-150 ${isUpdateProgVisible ? 'scale-100' : 'scale-0'}`}>
                <div className="bg-estoque-bg p-3 rounded-2xl border border-stam-border relative">
                    <h1 className="text-white font-regular text-xl text-center mt-2">Atualizar progamação</h1>
                    <span
                        className="closeUpdateProg material-symbols-outlined absolute right-2 top-2 text-white rounded-lg hover:bg-gray-600 p-1.5 cursor-pointer"
                        onClick={toggleUpdateProg}
                    >
                        close
                    </span>
                    <div className="bg-stam-bg-3 p-4 mt-6 border border-stam-border rounded-lg">
                        <div className="mt-4">
                            <input
                                className="desciptionCreateProgGalvaInput rounded-lg bg-transparent border border-stam-border outline-none text-white pl-1.5 font-light caret-stam-orange hover:border-stam-orange h-8"
                                placeholder="Descrição"
                            />
                            <div className="mt-2 space-x-2">
                                <input
                                    className="updateProgGalvaInput rounded-lg bg-transparent border border-stam-border outline-none text-white pl-1.5 font-light caret-stam-orange hover:border-stam-orange h-8"
                                    placeholder="Acabamento"
                                />
                                <input
                                    type="number"
                                    className="prioridadeInput rounded-lg bg-transparent border border-stam-border outline-none text-white pl-1.5 font-light caret-stam-orange hover:border-stam-orange h-8"
                                    placeholder="Prioridade"
                                />
                            </div>
                        </div>
                        <div className="mt-7 flex justify-center space-x-3">
                            <button
                                className="rounded-lg border border-stam-border w-32 h-8 font-light text-gray-300 hover:bg-stam-vermelho hover:border-stam-vermelho"
                            >Deletar
                            </button>
                            <button
                                className="rounded-lg bg-gray-600 w-32 h-8 font-light text-white buttonHover"
                            >Atualizar
                            </button>
                            <button
                                className="rounded-lg bg-stam-orange w-32 h-8 font-medium text-black buttonHover"
                            >Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="bg-estoque-bg p-3 rounded-3xl mt-20 mb-6 border border-stam-border">
                    <div className="bg-stam-bg-3 rounded-2xl p-3 border border-stam-border">
                        <div className="flex justify-center mb-4 items-center relative">
                            <div className="flex justify-center">
                                <span
                                    className="arrowIcon material-symbols-outlined text-white mr-10 cursor-pointer hover:bg-stam-border rounded-full py-1.5 px-3"
                                    onClick={irParaSemanaAnterior}
                                >
                                    arrow_back
                                </span>
                                <div className="flex items-center space-x-1.5">
                                    <span className="material-symbols-outlined progGalvaIcon text-white">
                                        list_alt
                                    </span>
                                    <p className="text-white font-light text-xl">Programação Galvanoplastia</p>
                                </div>
                                <span
                                    className="arrowIcon material-symbols-outlined text-white ml-11 cursor-pointer hover:bg-stam-border rounded-full py-1.5 px-3"
                                    onClick={irParaProximaSemana}
                                >
                                    arrow_forward
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center overflow-hidden">
                            <div className="progGalvaTableDiv rounded border border-gray-500 overflow-hidden">
                                <table className={`w-full ${animationDirection} ${isBlurred ? 'blur-sm' : ''}`}>
                                    <thead className="bg-gray-600">
                                        <tr className="text-white font-regular text-lg border-b border-gray-500">
                                            {currentWeek.map((day, index) => (
                                                <th key={index} className="w-56 py-2 border-r border-gray-500 font-normal">
                                                    <div className="flex justify-center items-center relative">
                                                    {activeFilterIndex === index && (
                                                            <div className="filtrarDiv bg-stam-bg-7 p-2 border border-gray-500 absolute z-20 rounded-lg">
                                                                <span
                                                                    className="closeUpdateProg material-symbols-outlined absolute right-1 top-1 text-white rounded-lg hover:bg-gray-500 p-1 cursor-pointer"
                                                                    onClick={() => toggleFiltar(index)}
                                                                >
                                                                    close
                                                                </span>
                                                                <div className="bg-gray-600 p-3 rounded">
                                                                    <div className="flex justify-center">
                                                                        <div className="font-light leading-none space-y-2 w-44">
                                                                            <p className="cursor-pointer hover:text-stam-orange hover:font-regular" onClick={() => toggleFiltar(index)}>A-Z</p>
                                                                            <p className="cursor-pointer hover:text-stam-orange hover:font-regular" onClick={() => toggleFiltar(index)}>Separação</p>
                                                                            <p className="cursor-pointer hover:text-stam-orange hover:font-regular" onClick={() => toggleFiltar(index)}>Preto Fosco</p>
                                                                            <p className="cursor-pointer hover:text-stam-orange hover:font-regular" onClick={() => toggleFiltar(index)}>Branco</p>
                                                                            <p className="cursor-pointer hover:text-stam-orange hover:font-regular" onClick={() => toggleFiltar(index)}>Zinco Preto</p>
                                                                            <p className="cursor-pointer hover:text-stam-orange hover:font-regular" onClick={() => toggleFiltar(index)}>Zincado</p>
                                                                            <p className="cursor-pointer hover:text-stam-orange hover:font-regular" onClick={() => toggleFiltar(index)}>Niquelado</p>
                                                                            <p className="cursor-pointer hover:text-stam-orange hover:font-regular" onClick={() => toggleFiltar(index)}>Gold </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <span
                                                            className="filterGalvaButton rotate-90 material-symbols-outlined absolute left-3 cursor-pointer bg-gray-400 text-white rounded w-6 h-6 flex justify-center items-center buttonHover"
                                                            onClick={() => toggleFiltar(index)}
                                                        >
                                                            play_arrow
                                                        </span>
                                                        <div>
                                                            <p className="text-xl">{day.toLocaleDateString('pt-BR', { weekday: 'long' })}</p>
                                                            <p className="font-thin text-base leading-tight -mt-0.5">
                                                                {day.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                                            </p>
                                                        </div>
                                                        <span
                                                            className="addGalvaButton material-symbols-outlined absolute right-3 cursor-pointer bg-stam-orange text-black rounded w-6 h-6 flex justify-center items-center buttonHover"
                                                            onClick={() =>
                                                                toggleCreateProg(
                                                                    day.toLocaleDateString('pt-BR', { weekday: 'long' }),
                                                                    day.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                                                                )
                                                            }
                                                        >
                                                            add
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-stam-bg-3 text-white font-thin">
                                        <tr className="border-b border-gray-500">
                                            <td
                                                className="text-center border-r text-verde-lucro font-light border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-white rounded-sm bottom-1.5 left-1.5"></div>
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">1</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-preto-fosco rounded-sm bottom-1.5 left-1.5"></div>
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">1</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - PRETO FOSCO
                                            </td>
                                            <td
                                                className="text-center border-r text-verde-lucro font-light border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-zincado rounded-sm bottom-1.5 left-1.5"></div>
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">1</p>
                                                ALAVANCA LINGUETA 901/905 - ZINCADO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-niquelado rounded-sm bottom-1.5 left-1.5"></div>
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">1</p>
                                                CHAPA LINGUETA 1007 - NIQUELADO
                                            </td>
                                            <td

                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-sm bottom-1.5 left-1.5 shadow-xl"></div>
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">1</p>
                                                ROSETA 805 RQ1 - GOLD
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-500">
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-gradient-to-r from-gray-300 to-gray-500 rounded-sm bottom-1.5 left-1.5 shadow-lg"></div>
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">2</p>
                                                ESPELHO 1003 - CROMADO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-zinco-preto rounded-sm bottom-1.5 left-1.5"></div>
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">2</p>
                                                ESPELHO 803 - ZINCO PRETO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">2</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">2</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">2</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-500">
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">3</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">3</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">3</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">3</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">3</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-500">
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">4</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">4</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">4</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">4</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">4</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-500">
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">5</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">5</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">5</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">5</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">5</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-500">
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">6</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">6</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">6</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">6</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">6</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-500">
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">7</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">7</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">7</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">7</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">7</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-500">
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">8</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">8</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">8</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">8</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">8</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">9</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">9</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">9</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center border-r border-gray-500 pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">9</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                            <td
                                                className="text-center pt-3 pb-2.5 px-2 w-60 hover:bg-stam-bg-7 cursor-pointer relative leading-none"
                                                onClick={toggleUpdateProg}
                                            >
                                                <p className="absolute right-1.5 top-1 text-xs text-stam-orange font-medium">9</p>
                                                ESPELHO 503/603 S/ MACANETA - INOX 430 - BRANCO
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramacaoGalvanoplastia