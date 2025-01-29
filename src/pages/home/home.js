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
                        <div className="fraseMotivacional absolute text-right">
                            <p className="text-white font-thin text-2xl">As oportunidades não aparecem, <span className="text-stam-orange font-light">você as cria</span>.</p>
                            <p className="text-gray-300 font-thin">- Chris Grosser</p>
                        </div>
                    </div>
                    <div className="space-y-10 mt-6">
                        <div className="md:flex block space-x-10">
                            <FeedCard
                                title="SISTEMA ATUALIZADO!"
                                icon="./imagens/arthur.jpeg"
                                description="O System atualizou! Agora com inúmeras novas melhorias e funcionalidades que foram implementadas, todas projetadas para oferecer uma experiência mais robusta e eficiente."
                                backgroundSize="hidden"
                                feedCardWidth="feedCardWidth backgroundGradient"
                                backgroundWidth="backgroundWidth"
                                logoStyle="w-80 top-28"
                                userName="Arthur Alves"
                                department="- Desenvolvedor"
                                route="/"
                                vibroStyle='hidden'
                                perfilStyle='hidden'
                            />
                            <FeedCard
                                title="SISTEMA DE PERFIL"
                                icon="./imagens/systemIcon.png"
                                description="O System agora conta com um sistema de perfil, onde você pode se conectar com outros usuários."
                                background="https://scontent-gig4-1.cdninstagram.com/v/t39.30808-6/458140658_935586761926028_7845448588632815243_n.jpg?stp=dst-jpg_e35&cb=9b69d9bc-1c402c4c&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=gPaP0OUi_hoQ7kNvgG4APwq&_nc_gid=4cd0f16b39a74abe84653b3089eb5e0a&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQ0OTg1NzAyMDg3NjUwNTEzMA%3D%3D.3-ccb7-5-cb9b69d9bc-1c402c4c&oh=00_AYB0Kj_rKdVL0HknhXw6Wy8LDIlTfhNs9udxKhJZz01bqw&oe=67237CF4&_nc_sid=22de04"
                                style="hidden"
                                feedCardWidth="bg-dark-bg"
                                userName="System"
                                vibroStyle='hidden'
                                logoStyle="hidden"
                                route="/usuarios/arthurm"
                            />
                        </div>
                        <div className="flex space-x-10">
                            <FeedCard
                                title="AGORA NO VIBRO!"
                                icon="./imagens/systemIcon.png"
                                description="O sistema de localização do estoque agora presente também no vibroacabamento."
                                background="https://scontent-gig4-1.cdninstagram.com/v/t39.30808-6/458140658_935586761926028_7845448588632815243_n.jpg?stp=dst-jpg_e35&cb=9b69d9bc-1c402c4c&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=gPaP0OUi_hoQ7kNvgG4APwq&_nc_gid=4cd0f16b39a74abe84653b3089eb5e0a&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQ0OTg1NzAyMDg3NjUwNTEzMA%3D%3D.3-ccb7-5-cb9b69d9bc-1c402c4c&oh=00_AYB0Kj_rKdVL0HknhXw6Wy8LDIlTfhNs9udxKhJZz01bqw&oe=67237CF4&_nc_sid=22de04"
                                style="hidden"
                                feedCardWidth="bg-stam-bg-5"
                                userName="System"
                                logoStyle="hidden"
                                perfilStyle='hidden'
                                route="/vibroacabamento"
                            />
                            <FeedCard
                                title="CARDÁPIO SEMANAL"
                                icon="./imagens/systemIcon.png"
                                description="Cardápio semanal"
                                backgroundSize="hidden"
                                feedCardWidth="feedCardWidth backgroundGradient"
                                backgroundWidth="backgroundWidth"
                                logoStyle="w-80 top-28"
                                userName="System"
                                route="/"
                                vibroStyle='hidden'
                                perfilStyle='hidden'
                            />
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
