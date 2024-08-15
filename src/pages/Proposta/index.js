import './proposta.css'
import Navbar from "../../componentes/Navbar"
import Box from '../../componentesProposta'

function Proposta() {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="divPrincipal bg-estoque-bg absolute mt-24 flex justify-center">
                    <div className='menu bg-stam-bg-3 flex justify-center items-center rounded-full space-x-3'>
                        <span className='material-symbols-outlined bg-stam-orange rounded-full menuIcon cursor-pointer'>
                            menu
                        </span>
                        <input className='rounded-full border-stam-border bg-stam-bg-3 border codeDescription h-8 outline-none pl-3 font-light text-white'
                            placeholder='Código'>
                        </input>
                        <input className='rounded-full border-stam-border bg-stam-bg-3 border inputDescription h-8 outline-none pl-3 font-light text-white'
                            placeholder='Descrição'>
                        </input>
                        <button className='localizarButton bg-stam-orange font-medium px-5 rounded-full no-focus-outline h-8'>Localizar</button>
                    </div>
                    <div className='estoqueBackground bg-stam-bg-3 absolute p-5'>
                        <div className='corredorA flex'>
                            <Box id="box1" boxNumber="1" style={"ml-11"} palletNumber1={1} palletNumber2={2}/>
                            <Box id="box2" boxNumber="2" style={"ml-1"} palletNumber1={1} palletNumber2={2}/>
                            <Box id="box3" boxNumber="3" style={"ml-1"} palletNumber1={1} palletNumber2={2}/>
                            <p className='A text-stam-border font-medium text-4xl ml-16'>A</p>
                            <Box id="box4" boxNumber="4" style={"ml-16"} palletNumber1={1} palletNumber2={2}/>
                            <Box id="box5" boxNumber="5" style={"ml-1"} palletNumber1={1} palletNumber2={2}/>
                            <Box id="box6" boxNumber="6" style={"ml-1"} palletNumber1={1} palletNumber2={2}/>
                            <Box id="box7" boxNumber="7" style={"ml-1"} palletNumber1={1} palletNumber2={2}/>
                            <Box id="box8" boxNumber="8" style={"ml-1"} palletNumber1={1} palletNumber2={2}/>
                            <Box id="box9" boxNumber="9" style={"ml-1"} palletNumber1={1} palletNumber2={2}/>
                        </div>
                        <div>
                            <Box
                                id="box10"
                                boxNumber="2"
                                style={"trilhoDiv -rotate-90 mt-7 absolute -ml-8"}
                                palletNumber1={"TRILHO"}
                                number2Style="hidden"
                                boxNumberStyle={"rotate-90"}
                            />
                        </div>
                        <div className='corredorB flex mt-7'>
                            <Box id="box1" boxNumber="1" style={"ml-11"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box2" boxNumber="2" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box3" boxNumber="3" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box3" boxNumber="3" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <p className='A text-stam-border font-medium text-4xl ml-6'>B</p>
                            <Box id="box4" boxNumber="4" style={"ml-6"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box5" boxNumber="5" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box6" boxNumber="6" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box7" boxNumber="7" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box8" boxNumber="8" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box9" boxNumber="9" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                        </div>
                        <div className='corredorB flex mt-7'>
                            <Box id="box1" boxNumber="1" style={"ml-11"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box2" boxNumber="2" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box3" boxNumber="3" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box3" boxNumber="3" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <p className='A text-stam-border font-medium text-4xl ml-6'>C</p>
                            <Box id="box4" boxNumber="4" style={"ml-6"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box5" boxNumber="5" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box6" boxNumber="6" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box7" boxNumber="7" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box8" boxNumber="8" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                            <Box id="box9" boxNumber="9" style={"ml-1"} palletNumber1={2} palletNumber2={1}/>
                        </div>
                    </div>
                </div>
                <div className='developedBy flex justify-center'>
                    <p className='absolute font-thin text-white z-50'>Desenvolvido e mantido por <span className='font-medium text-stam-orange'>Arthur</span></p>
                </div>
            </div>
        </div>
    )
}

export default Proposta