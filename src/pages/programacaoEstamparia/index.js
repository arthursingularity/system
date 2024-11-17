import Navbar from "../../componentes/Navbar"
import { useState, useEffect } from "react";
import './programacaoEstamparia.css'

function ProgramacaoEstamparia() {
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [loggedUserImg, setLoggedUserImg] = useState(null);
    const [loggedUserName, setLoggedName] = useState(null);
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const loggedId = localStorage.getItem('loggedUserId');
        const loggedIdImg = localStorage.getItem('loggedUserImg');
        const loggedName = localStorage.getItem('loggedName');

        setLoggedUserImg(loggedIdImg);
        setLoggedUserId(loggedId);
        setLoggedName(loggedName);
    }, []);

    useEffect(() => {
        document.title = "System";
    }, []);

    useEffect(() => {
        // Função para simular a digitação
        const typingEffect = (text, index) => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index)); // Adiciona letra por letra
                setTimeout(() => typingEffect(text, index + 1), 50); // Chama a função recursivamente com atraso
            }
        };

        if (loggedUserName) {
            const message = `Olá, ${loggedUserName}!`;
            setDisplayedText(""); // Limpa o texto antes de iniciar o efeito de digitação
            typingEffect(message, 0); // Inicia o efeito de digitação
        }
    }, [loggedUserName]);

    return (
        <div>
            <Navbar/>
            <div className="flex justify-center h-screen">
                <div className="flex items-center space-x-4">
                    <div className="ai-container">
                        <div className="ai-breath" />
                    </div>
                    <p className="text-white font-thin text-2xl">
                        <strong className="font-medium text-stam-orange">F.O.R.G.E. :</strong> {displayedText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProgramacaoEstamparia