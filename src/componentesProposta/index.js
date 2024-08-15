function Box({ boxNumber, style, palletNumber1, palletNumber2, number1Style, number2Style, boxNumberStyle }) {
    return (
        <div>
            <div className={`boxDiv border border-stam-border flex text-white font-medium p-1 space-x-1 relative ${style}`}>
                <p className={`number1 border border-stam-border text-xl cursor-pointer hover:bg-stam-orange hover:border-stam-bg-3 ${number1Style}`}>
                    {palletNumber1}
                </p>
                <p className={`${number2Style} number2 border border-stam-border text-xl cursor-pointer hover:bg-stam-orange hover:border-stam-bg-3`}>
                    {palletNumber2}
                </p>
                <div className={`${boxNumberStyle} absolute mt-11 left-9 font-light text-stam-border text-sm`}>
                    <p>{boxNumber}</p>
                </div>
            </div>
        </div>
    )
}

export default Box

