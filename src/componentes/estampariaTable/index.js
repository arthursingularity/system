import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import './estampariatable.css';
import LinhaTabela from '../LinhaTabela';
import estampariaData from "../estampariaData";

const EstampariaTable = forwardRef(({ onClose }, ref) => {
    const [buttonState, setButtonState] = useState({});
    const [filterText, setFilterText] = useState('');
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focusInput() {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }));

    const copyToClipboard = (event, rowIndex) => {
        const row = event.currentTarget.closest("tr");
        if (row) {
            const descricaoCell = row.querySelectorAll("td")[0];
            if (descricaoCell) {
                const textToCopy = descricaoCell.childNodes[0].nodeValue.trim();
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        setButtonState(prevState => ({ ...prevState, [rowIndex]: 'Copiado!' }));
                        setTimeout(() => {
                            setButtonState(prevState => ({ ...prevState, [rowIndex]: 'Copiar' }));
                        }, 2000);
                    })
                    .catch(err => {
                        console.error("Erro ao copiar o texto: ", err);
                    });
            }
        }
    };

    const handleFilterChange = (event) => {
        const value = event.target.value.toUpperCase();
        setFilterText(value);
    };

    const clearFilterInput = () => {
        setFilterText('');
    };

    const filteredData = estampariaData.filter(item =>
        item.codigo.toUpperCase().includes(filterText) ||
        item.descricao.toUpperCase().includes(filterText)
    );

    return (
        <div>
            <div className='flex justify-center mt-8 items-center space-x-3'>
                <input
                    ref={inputRef}
                    className="input-placeholder3 z-20 absolute py-1 bg-stam-bg-3 ml-3 border border-stam-border rounded-full outline-none px-3 caret-stam-orange hover:border-stam-orange"
                    placeholder="Pesquisar por descrição"
                    type="text"
                    maxLength={70}
                    value={filterText}
                    onChange={handleFilterChange}
                />
                <span
                    className="material-symbols-outlined text-white clearInputTable z-40 text-stam-bg-3 px-3 py-1 absolute cursor-pointer hover:bg-stam-border rounded-full"
                    onClick={clearFilterInput}
                >
                    close
                </span>
                <span
                    className="material-symbols-outlined absolute closeDataTable z-40 text-white p-2 cursor-pointer hover:bg-stam-bg-4 rounded-lg"
                    onClick={onClose}
                >
                    close
                </span>
            </div>
            <div className='flex justify-center'>
                <div className='bg-stam-bg-3 divInvisivel absolute top-1'></div>
            </div>
            <div className='flex justify-center'>
                <div className="tableDiv overflow-hidden rounded-lg border border-stam-border mt-11 bg-stam-border">
                    <table className="w-full border-collapse tabela">
                        <thead>
                            <tr>
                                <th className="px-6 py-1 text-sm font-medium border-stam-border border-b">CÓDIGO</th>
                                <th className="py-1 pl-6 pr-5 text-sm border-l border-stam-border border-b">DESCRIÇÃO</th>
                                <th className="text-sm border-l border-stam-border border-b">AÇÃO</th>
                            </tr>
                        </thead>
                        <tbody className="bg-stam-bg-3">
                            {filteredData.map((item, index) => (
                                <LinhaTabela
                                    key={index}
                                    codigo={item.codigo}
                                    descricao={item.descricao}
                                    buttonState={buttonState[index]}
                                    onCopyClick={copyToClipboard}
                                    rowIndex={index}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});

export default EstampariaTable;

