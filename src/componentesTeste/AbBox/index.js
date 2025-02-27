import './abbox.css';

function AbBox({ id, letter1, letter2, selectedLetterId, highlightedLetters, onClick, props, letterVisibility, resetState, type }) {
    const letterClass = resetState ? 'bg-stam-bg-3 border-stam-border' : '';
    
    return (
        <div className="font-light text-white text-xl">
            <div className={`flex space-x-1 p-1 border border-stam-border rounded-lg text-2xl justify-center ${props}`}>
                <p
                    className={`letter ${type} flex justify-center border border-stam-border rounded cursor-pointer hover:bg-stam-orange hover:border-stam-orange ${selectedLetterId === `${id}-${letter1}` || highlightedLetters[`${id}-${letter1}`] ? 'bg-stam-orange border-stam-orange' : letterClass}`}
                    onClick={() => onClick(id, letter1)}
                >
                    {letter1}
                </p>
                <p
                    className={`letter ${type} flex justify-center border border-stam-border rounded cursor-pointer hover:bg-stam-orange hover:border-stam-orange ${letterVisibility} ${selectedLetterId === `${id}-${letter2}` || highlightedLetters[`${id}-${letter2}`] ? 'bg-stam-orange border-stam-orange' : letterClass}`}
                    onClick={() => onClick(id, letter2)}
                >
                    {letter2}
                </p>
            </div>
        </div>
    );
}

export default AbBox;
