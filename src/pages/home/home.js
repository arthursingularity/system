import React from "react";
import Navbar from "../../componentes/Navbar"

function Home() {

    React.useEffect(() => {
        document.title = "System";
    }, []);

    return (
        <div>
            <Navbar/>
        </div>
    )
}

export default Home