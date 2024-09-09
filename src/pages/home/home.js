import React from "react";
import Navbar from "../../componentes/Navbar"

function Home() {

    React.useEffect(() => {
        document.title = "System";
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="h-screen flex justify-center items-center">
                <img src="system-logo.png" className="w-96"></img>
                <hr className="w-28 rotate-90 border-stam-bg-4"></hr>
                <div className="mb-4">
                    <p className="text-white font-thin text-lg">Developed by</p>
                    <img src="texosLogo.png" className="w-32"></img>
                </div>
            </div>
        </div>
    )
}

export default Home