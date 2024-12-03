import React from "react";
import Navbar from "../../componentes/Navbar";
import { useState, useEffect, useRef } from "react";
import './home.css';
import FeedCard from "../../componentes/FeedCard";

function Home() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        document.title = "Página inicial";

        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = date.toLocaleDateString('pt-BR', options);

        const [dayOfWeek, dayAndMonth] = formattedDate.split(', ');
        const finalDate = `${dayOfWeek.toUpperCase()} ${dayAndMonth.toUpperCase()}`;
        setCurrentDate(finalDate);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="pb-10">
                    <div>
                        <p className="mt-20 text-gray-400 font-light text-base">
                            {currentDate}
                            <p className="font-regular text-white text-5xl mt-1">Feed</p>
                        </p>
                    </div>
                    <div className="space-y-10 mt-6">
                        <div className="md:flex block space-x-10">
                            <FeedCard
                                title="SISTEMA ATUALIZADO!"
                                icon="https://media.licdn.com/dms/image/v2/D4D03AQGVOfRDOxagqg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730323825860?e=1735776000&v=beta&t=m1MXxuR3a3N90PMVrNoD7GveliUCwvYfLpniQjdtfNs"
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
                                title="SISTEMA DE PERFIL!"
                                icon="https://i.imgur.com/KZhWb9J.png"
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
                                icon="https://i.imgur.com/KZhWb9J.png"
                                description="O sistema de localização do estoque agora presente também no vibroacabamento."
                                background="https://scontent-gig4-1.cdninstagram.com/v/t39.30808-6/458140658_935586761926028_7845448588632815243_n.jpg?stp=dst-jpg_e35&cb=9b69d9bc-1c402c4c&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=gPaP0OUi_hoQ7kNvgG4APwq&_nc_gid=4cd0f16b39a74abe84653b3089eb5e0a&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQ0OTg1NzAyMDg3NjUwNTEzMA%3D%3D.3-ccb7-5-cb9b69d9bc-1c402c4c&oh=00_AYB0Kj_rKdVL0HknhXw6Wy8LDIlTfhNs9udxKhJZz01bqw&oe=67237CF4&_nc_sid=22de04"
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
    );
}

export default Home;
