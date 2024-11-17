import './feedCard.css'

function FeedCard({ title, description, icon, background, style, backgroundSize, feedCardWidth, logoStyle, userName, department, route, vibroStyle, perfilStyle }) {
    return (
        <div>
            <div>
                <a href={`${route}`}>
                    <div className={`w-96 feedCardBg ${feedCardWidth} border-8 border-stam-bg-4 rounded-3xl buttonHover cursor-pointer relative`}>
                        <div className="text-white bg-stam-bg-4 absolute rounded-tl rounded-br-xl font-medium pl-3 pr-4 py-1 text-lg pb-2">{title}</div>
                        <div className="flex justify-center">
                            <div className="bg-stam-bg-4 absolute bottom-0 w-full text-left p-1.5 pt-4">
                                <div className="bg-stam-border rounded-2xl px-5 pb-3">
                                    <div className='flex space-x-3.5 items-center'>
                                        <img src={icon} className="w-16 h-16 rounded-lg mt-3" />
                                        <div>
                                            <p className="leading-none text-white font-light text-lg mt-4">{description}</p>
                                            <div className='flex mt-1'>
                                                <p className='text-stam-orange font-medium text-sm'>{userName}</p>
                                                <p className='font-regular text-sm text-gray-300 ml-1'>{department}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`flex justify-center`}>
                            <img src="./imagens/systemlogo.png" className={`absolute systemLogoGradient ${logoStyle}`} />
                        </div>
                        <div className={`mt-24 ${vibroStyle}`}>
                            <div className='flex justify-center'>
                                <span className="material-symbols-outlined vibroIcon text-white">
                                    vibration
                                </span>
                            </div>
                            <div className='flex justify-center'>
                                <p className='text-white font-thin text-3xl'>
                                    Vibroacabamento
                                </p>
                            </div>
                        </div>
                        <div className={`${perfilStyle} flex justify-center`}>
                            <img src='./imagens/perfilExample.png' className='perfilExample rounded-tl-2xl rounded-tr-2xl'/>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default FeedCard