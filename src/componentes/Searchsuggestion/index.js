import estampariaData from '../estampariaData';
import './searchsuggestion.css';

function SearchSuggestion({ searchValue, onSuggestionClick }) {

    const filteredData = estampariaData.filter(item => item.descricao.includes(searchValue));

    return (
        <div>
            <div className="SearchSuggestionDiv bg-transparent backdrop-blur-xl border border-stam-border absolute z-30 p-4">
                <div className='SearchSuggestionDiv2'>
                    <table>
                        {filteredData.map((item, index) => (
                            <tr key={index} onClick={() => onSuggestionClick(item.descricao)}>
                                <td className="pb-2 pt-2 px-3 whitespace-nowrap text-sm text-white cursor-pointer suggestion-item hover:bg-gray-700 rounded-lg tableline">
                                    {item.descricao}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SearchSuggestion;
