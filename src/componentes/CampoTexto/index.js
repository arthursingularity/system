import React, { useState } from 'react';

function CampoTexto(props) {
    const [inputValue, setInputValue] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleInput = (e) => {
        let value = e.target.value;

        if (props.nome === "Nome") {
            value = value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, '') // Permite apenas letras
            value = value.replace(/^\s+|\s+$/g, '') // Remove espaços no início e no fim
            value = value.charAt(0).toUpperCase() + value.slice(1) // Primeira letra maiúscula
        }

        if (props.nome === "Sobrenome") {
            value = value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, ''); // Permite apenas letras
            value = value.charAt(0).toUpperCase() + value.slice(1); // Primeira letra maiúscula
        }

        setInputValue(value);
    };

    const handleClearInput = () => {
        setInputValue("");
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="flex justify-center items-center">
            <div>
                <label id={props.labelId} className="text-white block mb-1 font-light mt-3 cursor-text">{props.nome}</label>
                <input
                    type={props.type === "password" && isPasswordVisible ? "text" : props.type}
                    id={props.inputId}
                    value={inputValue}
                    onChange={handleInput}
                    className="bg-transparent border border-stam-border rounded-full outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange"
                />
                {inputValue !== "" && (
                    <div className="flex justify-center items-center">
                        <span
                            className="material-symbols-rounded absolute mb-11 cursor-pointer text-stam-border hover:text-stam-orange"
                            onClick={handleClearInput}
                            id={props.nome === "Senha" || props.nome === "Confirmar senha" ? "clearPasswordInput" : "clearInput"}
                        >
                            cancel
                        </span>
                    </div>
                )}
                {(props.nome === "Senha" || props.nome === "Confirmar senha") && (
                    <div className="flex justify-center items-center">
                        <span
                            className={`material-symbols-rounded absolute mb-11 cursor-pointer ${isPasswordVisible ? 'text-[#FF6600]' : 'text-stam-border'} hover:text-stam-orange`}
                            onClick={togglePasswordVisibility}
                            id="visibilityIcon"
                        >
                            {isPasswordVisible ? "visibility" : "visibility_off"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CampoTexto;
