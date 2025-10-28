import React from "react";
import axios from "axios";
import Navbar from "../../componentes/Navbar";
import { useState, useEffect, useRef } from "react";
import './home.css';
import FeedCard from "../../componentes/FeedCard";

function Home() {
    const [currentDate, setCurrentDate] = useState('');
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        document.title = "Página inicial";

        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = date.toLocaleDateString('pt-BR', options);
        const [dayOfWeek, dayAndMonth] = formattedDate.split(', ');
        const finalDate = `${dayOfWeek.toUpperCase()}, ${dayAndMonth.toUpperCase()}`;
        setCurrentDate(finalDate);

        const fetchTemperature = async () => {
            try {
                const apiKey = '9c0858395fb1c2d0e59e373b8d1d8378';
                const city = 'Nova Friburgo,BR';
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

                const response = await axios.get(url);
                const temp = response.data.main.temp;
                setTemperature(temp);
            } catch (error) {
                console.error("Erro ao buscar a temperatura:", error);
            }
        };

        fetchTemperature();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="pb-10">
                    <div>
                        <p className="mt-20 text-gray-400 font-light text-base">
                            {currentDate}
                            {temperature !== null && (
                                <span> - {Math.round(temperature)} °C</span>
                            )}
                            <p className="font-regular text-white text-5xl mt-1">Feed</p>
                        </p>
                    </div>
                    <div className="space-y-10 mt-6">
                        <div className="md:flex block space-x-10">
                            <FeedCard
                                title="SISTEMA ATUALIZADO!"
                                icon="./imagens/arthur.png"
                                description="O System atualizou! Agora com inúmeras novas melhorias e funcionalidades que foram implementadas, todas projetadas para oferecer uma experiência mais robusta e eficiente."
                                backgroundSize="hidden"
                                feedCardWidth="feedCardWidth backgroundGradient"
                                backgroundWidth="backgroundWidth"
                                logoStyle="w-80 top-28"
                                userName="Arthur Alves"
                                department="- Suprimentos"
                                route="/"
                                vibroStyle='hidden'
                                perfilStyle='hidden'
                            />
                            <div className="hidden">
                                <FeedCard
                                    title="Card"
                                    icon="./imagens/systemIcon.png"
                                    description="Card"
                                    background="./imagens/systemIcon.png"
                                    style="hidden"
                                    feedCardWidth="bg-stam-bg-5"
                                    userName="System"
                                    logoStyle="hidden"
                                    perfilStyle='hidden'
                                    route="/vibroacabamento"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
