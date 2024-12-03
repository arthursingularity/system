import Modelo3D from "../../componentes/Modelo3D"
import Navbar from "../../componentes/Navbar"

function Componentes() {
    return (
        <div>
            <Navbar/>
            <div className="flex space-x-96 absolute mt-20">
                <Modelo3D
                    filePath="/models/suportedatesta.glb"
                    description="SUPORTE TESTA 500/600/800/900/1500/1800/2001"    
                />
                <Modelo3D
                    filePath="/models/suportemolaclassic.glb"
                    description="SUPORTE MOLA CLASSIC"    
                />
            </div>
        </div>
    )
}

export default Componentes