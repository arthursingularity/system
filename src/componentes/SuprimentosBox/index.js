import './suprimentosbox.css';

function SuprimentosBox({ isVisible, onMouseEnter, onMouseLeave }) {
  if (!isVisible) return null;

  return (
    <div className="flex justify-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="SuprimentosBox fixed bg-stam-bg-3 p-1.5 rounded-xl font-light text-white z-20 border border-stam-border">
        <a href='/estoqueestamparia'>
          <div className='flex justify-center items-center p-4 cursor-pointer hover:bg-stam-bg-4 rounded-lg'>
            <span className="material-symbols-outlined SuprimentosBoxIcon">
              package_2
            </span>
            <p className='ml-2 mr-2'>Estoque Estamparia</p>
          </div>
        </a>
        <a href='/vibroacabamento'>
          <div className='flex justify-center items-center p-4 cursor-pointer hover:bg-stam-bg-4 rounded-lg'>
            <span className="material-symbols-outlined SuprimentosBoxIcon">
              vibration
            </span>
            <p className='ml-2 mr-2'>Vibroacabamento</p>
          </div>
        </a>
        <a href='/programacaoestamparia'>
          <div className='flex justify-center items-center p-4 cursor-pointer hover:bg-stam-bg-4 rounded-lg'>
            <span className="material-symbols-outlined SuprimentosBoxIcon">
              terminal
            </span>
            <p className='ml-2 mr-2'>Programação Estamparia</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default SuprimentosBox;