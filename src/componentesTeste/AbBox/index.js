import './abbox.css';

function AbBox({ id, letter1, letter2, selectedLetterId, highlightedLetters, onClick }) {
    return (
        <div className="font-light text-white text-xl">
            <div className="abBox flex space-x-1 p-1 border border-stam-border rounded-lg text-2xl">
                <p
                    className={`letter border border-stam-border rounded cursor-pointer hover:bg-stam-orange hover:border-stam-orange ${selectedLetterId === `${id}-${letter1}` ? 'bg-stam-orange border-stam-orange' : ''} ${highlightedLetters[`${id}-${letter1}`] ? 'bg-stam-orange border-stam-orange' : ''}`}
                    onClick={() => onClick(id, letter1)}
                >
                    {letter1}
                </p>
                <p
                    className={`letter border border-stam-border rounded cursor-pointer hover:bg-stam-orange hover:border-stam-orange ${selectedLetterId === `${id}-${letter2}` ? 'bg-stam-orange border-stam-orange' : ''} ${highlightedLetters[`${id}-${letter2}`] ? 'bg-stam-orange border-stam-orange' : ''}`}
                    onClick={() => onClick(id, letter2)}
                >
                    {letter2}
                </p>
            </div>
        </div>
    );
}

export default AbBox;
