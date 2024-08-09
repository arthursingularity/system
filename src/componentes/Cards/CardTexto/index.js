import './Cardtexto.css';
import { useState, useRef } from 'react';

function CardTexto({ visibilidade, onVoltar }) {
    const [codigo, setCodigo] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [cxFechada, setCxFechada] = useState('');
    const [avulsas, setAvulsas] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const codigoRef = useRef(null);
    const quantidadeRef = useRef(null);
    const cxFechadaRef = useRef(null);
    const avulsasRef = useRef(null);

    const handleInput = (e, maxLength, setter) => {
        const { value } = e.target;
        if (value.length > maxLength) {
            setter(value.slice(0, maxLength));
        } else {
            setter(value);
        }
    };

    const handleConfirmar = (e) => {
        e.preventDefault();

        const codigoInput = codigoRef.current;
        const quantidadeInput = quantidadeRef.current;
        const cxFechadaInput = cxFechadaRef.current;
        const avulsasInput = avulsasRef.current;

        codigoInput.classList.remove('border-texos-red');
        quantidadeInput.classList.remove('border-texos-red');
        cxFechadaInput.classList.remove('border-texos-red');
        avulsasInput.classList.remove('border-texos-red');

        let valid = true;

        // Validação de "Código"
        if (codigo.length !== 5) {
            codigoInput.classList.add('border-texos-red');
            valid = false;
        }

        // Validação de "Quantidade"
        if (quantidade.length < 2) {
            quantidadeInput.classList.add('border-texos-red');
            valid = false;
        }

        // Validação de Cx. fechada e Avulsas
        if (cxFechada.trim() === '' && avulsas.trim() === '') {
            cxFechadaInput.classList.add('border-texos-red');
            avulsasInput.classList.add('border-texos-red');
            quantidadeInput.classList.add('border-texos-red');
            valid = false;
        } else if (cxFechada.trim() !== '') {
            const cxFechadaValue = parseFloat(cxFechada);
            const quantidadeValue = parseFloat(quantidade);
            
            if (isNaN(cxFechadaValue) || isNaN(quantidadeValue)) {
                cxFechadaInput.classList.add('border-texos-red');
                quantidadeInput.classList.add('border-texos-red');
                valid = false;
            } else {
                if (cxFechadaValue * 30 > quantidadeValue) {
                    cxFechadaInput.classList.add('border-texos-red');
                    quantidadeInput.classList.add('border-texos-red');
                    valid = false;
                }
            }

            // A validação de "Avulsas" só é necessária se "Cx. fechada" estiver preenchido
            if (avulsas.trim() !== '' && avulsas !== quantidade) {
                avulsasInput.classList.add('border-texos-red');
                quantidadeInput.classList.add('border-texos-red');
                valid = false;
            }
        } else if (cxFechada.trim() === '' && avulsas !== quantidade) {
            avulsasInput.classList.add('border-texos-red');
            quantidadeInput.classList.add('border-texos-red');
            valid = false;
        }

        if (valid) {
            console.log('Formulário enviado com sucesso');
            setIsSubmitted(true);
        } else {
            console.log('Por favor, corrija os campos inválidos.');
        }
    };

    return (
        <div className={`${visibilidade} ${isSubmitted ? 'hidden' : ''}`}>
            <form>
                <input
                    ref={codigoRef}
                    type="number"
                    placeholder="Código"
                    className="cardInputs ml-6 mb-1 border border-stam-border bg-stam-bg-3 rounded-full text-center text-white font-light outline-none"
                    value={codigo}
                    onInput={(e) => handleInput(e, 5, setCodigo)}
                />
                <input
                    ref={quantidadeRef}
                    type="number"
                    placeholder="Quantidade"
                    className="cardInputs ml-8 border border-stam-border bg-stam-bg-3 rounded-full text-center text-white font-light outline-none"
                    value={quantidade}
                    onInput={(e) => handleInput(e, 4, setQuantidade)}
                />
                <input
                    ref={cxFechadaRef}
                    type="number"
                    placeholder="Cx. fechada"
                    className="cardInputs mt-2 ml-6 border border-stam-border bg-stam-bg-3 rounded-full text-center text-white font-light outline-none"
                    value={cxFechada}
                    onInput={(e) => handleInput(e, 10, setCxFechada)}
                />
                <input
                    ref={avulsasRef}
                    type="number"
                    placeholder="Avulsas"
                    className="cardInputs ml-8 border border-stam-border bg-stam-bg-3 rounded-full text-center text-white font-light outline-none"
                    value={avulsas}
                    onInput={(e) => handleInput(e, 10, setAvulsas)}
                />
                <button
                    type='button'
                    onClick={onVoltar} // Chama a função onVoltar ao clicar
                    className='cardInputs mt-8 ml-6 border border-stam-border bg-stam-bg-3 rounded-full text-center text-white font-light outline-none hover:bg-stam-orange hover:border-stam-orange'
                >
                    Voltar
                </button>
                <button
                    type='submit'
                    onClick={handleConfirmar}
                    className='cardInputs ml-8 border border-stam-border bg-stam-bg-3 rounded-full text-center text-white font-light outline-none hover:bg-stam-orange hover:border-stam-orange'
                >
                    Confirmar
                </button>
            </form>
        </div>
    );
}

export default CardTexto;
