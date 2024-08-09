import React, { useState, forwardRef } from 'react'

const CampoUser = forwardRef((props, ref) => {
    const [user, setUser] = useState("");

    const clearInput = () => {
        setUser(""); // Limpar o campo de email
    };

    const handleChange = (event) => {
        const value = event.target.value;
        const regex = /^[A-Za-z]*$/; // Regex para permitir apenas letras
        if (regex.test(value)) {
            setUser(value); // Atualizar o estado com o valor digitado se for válido
        }
    };
    return (
        <div className="flex justify-center items-center mt-7">
            <div>
                <label id='labelUser' className="text-white block mb-1 font-light cursor-text">{props.nome}</label>
                <input
                    type="text"
                    id='inputUser'
                    value={user}
                    onChange={handleChange}
                    className="bg-transparent border border-stam-border rounded-full outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange"
                />
                <div className="flex justify-center items-center">
                    {user !== "" && (
                        <span className="material-symbols-rounded absolute mb-11 cursor-pointer text-stam-border hover:text-stam-orange"
                            id="clearInput"
                            onClick={clearInput}
                        >
                            cancel
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
});

export default CampoUser;
