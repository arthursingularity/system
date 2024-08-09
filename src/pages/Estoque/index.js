import ListaComponentes from "../../componentes/ListaComponentes";
import Navbar from "../../componentes/Navbar";
import Trilho from "../../componentes/Trilho";
import AbBox from "../../componentesTeste/AbBox";
import PalletBox from "../../componentesTeste/PalletBox";
import "./teste.css";
import { useState, useEffect } from "react";

const boxIds = [
    'box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'box7', 'box8', 'box9',
    'box10', 'box11', 'box12', 'box13', 'box14', 'box15', 'box16', 'box17', 'box18', 'box19', 'box20', 'box21',
    'box22', 'box23', 'box24', 'box25', 'box26', 'box27', 'box28', 'box29', 'box30', 'box31', 'box32', 'box33',
    'box34', 'box35', 'box36', 'box37', 'box38', 'box39', 'box40', 'box41', 'box42', 'box43', 'box44', 'box45'
];

function Estoque() {
    const [visiblePalletBox, setVisiblePalletBox] = useState(null);
    const [selectedLetterId, setSelectedLetterId] = useState('');
    const [inputValues, setInputValues] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [highlightedLetters, setHighlightedLetters] = useState({});
    const [isListaVisible, setIsListaVisible] = useState(false);
    const [inputBorderClass, setInputBorderClass] = useState('border-stam-border');

    useEffect(() => {
        const storedValues = boxIds.reduce((acc, id) => {
            ['A', 'B', 'TRILHO'].forEach(letter => {
                const values = Array(27).fill('').map((_, i) => localStorage.getItem(`${id}-${letter}-${i}`) || '');
                acc[`${id}-${letter}`] = values;
            });
            return acc;
        }, {});

        setInputValues(storedValues);
    }, []);

    const handleResetAllInputs = () => {
        const confirmReset = window.confirm("Você tem certeza de que deseja apagar todos os endereçamentos? Esta ação não pode ser desfeita.");
    
        if (confirmReset) {
            const resetValues = boxIds.reduce((acc, id) => {
                ['A', 'B', 'TRILHO'].forEach(letter => {
                    acc[`${id}-${letter}`] = Array(27).fill('');
                });
                return acc;
            }, {});
    
            setInputValues(resetValues);
    
            boxIds.forEach(id => {
                ['A', 'B', 'TRILHO'].forEach(letter => {
                    Array(27).fill('').forEach((_, i) => localStorage.removeItem(`${id}-${letter}-${i}`));
                });
            });
    
            const resetHighlighted = boxIds.reduce((acc, id) => {
                ['A', 'B', 'TRILHO'].forEach(letter => {
                    acc[`${id}-${letter}`] = false;
                });
                return acc;
            }, {});
    
            setHighlightedLetters(resetHighlighted);
        }
    };

    const toggleListaVisibility = () => setIsListaVisible(prev => !prev);

    const handleAbBoxClick = (id, letter) => {
        setVisiblePalletBox(id);
        setSelectedLetterId(`${id}-${letter}`);
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setSearchValue(text.toUpperCase().trim());
        } catch (error) {
            console.error('Falha ao acessar a área de transferência:', error);
        }
    };

    const handleClearInput = () => {
        setSearchValue('');
        setInputBorderClass('border-stam-border');
    };

    const handlePalletBoxClose = () => {
        setVisiblePalletBox(null);
        setSelectedLetterId('');
        setHighlightedLetters(prev => {
            const { [selectedLetterId]: _, ...rest } = prev;
            return rest;
        });
    };

    const handleInputChange = (index, value) => {
        const upperCaseValue = value.toUpperCase();
        setInputValues(prevValues => {
            const [boxId, letter] = selectedLetterId.split('-');
            const newValues = { ...prevValues };
            newValues[selectedLetterId][index] = upperCaseValue;
            localStorage.setItem(`${boxId}-${letter}-${index}`, upperCaseValue);
            return newValues;
        });
    };

    const handleSearch = () => {
        const trimmedSearchValue = searchValue.trim();

        if (trimmedSearchValue === '') {
            setInputBorderClass('border-stam-vermelho');
            return;
        }

        const highlighted = Object.entries(inputValues)
            .filter(([_, values]) => values.some(value => value.includes(trimmedSearchValue)))
            .reduce((acc, [letterId]) => ({ ...acc, [letterId]: true }), {});

        if (Object.keys(highlighted).length === 0) {
            setInputBorderClass('border-stam-vermelho');
        } else {
            setHighlightedLetters(highlighted);
            setInputBorderClass('border-stam-border');
        }
    };

    return (
        <div>
            <Navbar />
            <ListaComponentes visible={isListaVisible} toggleVisibility={toggleListaVisibility} />
            <div className="flex justify-center">
                <div className="text-left absolute z-40 ml-6 title block justify-center">
                    <p className="text-estoque-text font-light text-lg -mb-2">Estoque</p>
                    <p className="text-white font-medium text-xl">Estamparia</p>
                </div>
                <span class="material-symbols-outlined searchIcon absolute text-stam-border text-2xl z-40">
                    search
                </span>
                {searchValue && (
                    <span
                        className="material-symbols-outlined z-40 clearDescription text-stam-bg-3 bg-stam-border absolute cursor-pointer border border-stam-border hover:bg-stam-vermelho hover:border-stam-vermelho transition-all duration-150 rounded-full"
                        onClick={handleClearInput}
                    >
                        close
                    </span>
                )}
                <button
                    className="absolute colarButton bg-stam-bg-3 border border-stam-border rounded-full px-3 text-sm text-stam-border hover:bg-stam-border hover:text-white font-regular z-30"
                    onClick={handlePaste}
                >
                    Colar
                </button>
                <div className="flex justify-center">
                    <span
                        className="material-symbols-outlined z-30 resetButton text-stam-border border border-stam-border rounded-full hover:bg-stam-vermelho cursor-pointer hover:border-stam-vermelho hover:text-black"
                        onClick={handleResetAllInputs}
                    >
                        delete_forever
                    </span>
                </div>
                <div className="flex justify-center space-x-3 bg-stam-bg-3 py-3 menuDiv rounded-full z-20 absolute">
                    <span
                        className="material-symbols-outlined text-white p-1 border border-stam-border rounded-full hover:bg-stam-orange cursor-pointer hover:border-stam-orange"
                        onClick={toggleListaVisibility}
                    >
                        menu
                    </span>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value.toUpperCase().trim())}
                        className={`bg-stam-bg-3 inputDescription border ${inputBorderClass} pl-8 caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2`}
                        placeholder="Descrição"
                    />
                    <button
                        className="localizarButton bg-stam-orange font-medium px-5 rounded-full"
                        onClick={handleSearch}
                    >
                        Localizar
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="bg-stam-bg-3 estoqueDiv p-5 absolute z-20">
                    <div className="flex">
                        <div className="prateleira1 flex space-x-1 ml-10">
                            {['box1', 'box2', 'box3'].map(boxId => (
                                <AbBox
                                    key={boxId}
                                    id={boxId}
                                    letter1="A"
                                    letter2="B"
                                    selectedLetterId={selectedLetterId}
                                    highlightedLetters={highlightedLetters}
                                    onClick={handleAbBoxClick}
                                />
                            ))}
                        </div>
                        <div className="prateleira2 flex space-x-1 ml-40">
                            {['box4', 'box5', 'box6', 'box7', 'box8', 'box9'].map(boxId => (
                                <AbBox
                                    key={boxId}
                                    id={boxId}
                                    letter1="A"
                                    letter2="B"
                                    selectedLetterId={selectedLetterId}
                                    highlightedLetters={highlightedLetters}
                                    onClick={handleAbBoxClick}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="prateleira9 flex space-x-1 -ml-9 mt-8">
                        {['box45'].map(boxId => (
                            <AbBox
                                props="-rotate-90"
                                letterVisibility="hidden"
                                key={boxId}
                                id={boxId}
                                letter1="TRILHO"
                                selectedLetterId={selectedLetterId}
                                highlightedLetters={highlightedLetters}
                                onClick={handleAbBoxClick}
                            />
                        ))}
                    </div>
                    <div className="flex">
                        <div className="block">
                            <div className="prateleira3 flex space-x-1 ml-10 mt-8 -mb-3">
                                {['box10', 'box11', 'box12', 'box13'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="B"
                                        letter2="A"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                    />
                                ))}
                            </div>
                            <div className="prateleira5 flex space-x-1 ml-10 mt-5">
                                {['box20', 'box21', 'box22', 'box23'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="A"
                                        letter2="B"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                    />
                                ))}
                            </div>
                            <div className="prateleira7 absolute flex space-x-1 mt-28 ml-10">
                                {['box30', 'box31', 'box32', 'box33', 'box34', 'box35', 'box36', 'box37', 'box38', 'box39', 'box40', 'box41'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="B"
                                        letter2="A"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="block">
                            <div className="prateleira4 flex space-x-1 ml-20 mt-8">
                                {['box14', 'box15', 'box16', 'box17', 'box18', 'box19'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="B"
                                        letter2="A"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                    />
                                ))}
                            </div>
                            <div className="prateleira8 absolute flex space-x-1 rotate-90">
                                {['box42', 'box43', 'box44'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="A"
                                        letter2="B"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                    />
                                ))}
                            </div>
                            <div className="prateleira6 flex space-x-1 mt-2 ml-20">
                                {['box24', 'box25', 'box26', 'box27', 'box28', 'box29'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="A"
                                        letter2="B"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        {visiblePalletBox &&
                            <PalletBox
                                values={inputValues[selectedLetterId] || Array(27).fill('')}
                                onInputChange={(index, value) => handleInputChange(index, value)}
                                onClose={handlePalletBoxClose}
                                isVisible={!!visiblePalletBox}
                            />
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="bg-estoque-bg estoqueBg absolute rounded-3xl"></div>
            </div>
        </div>
    );
}

export default Estoque;