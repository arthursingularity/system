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
        <a href='/dashboard'>
          <div className='flex justify-center items-center p-4 cursor-pointer hover:bg-stam-bg-4 rounded-lg'>
            <span className="material-symbols-outlined SuprimentosBoxIcon">
              monitoring
            </span>
            <p className='ml-2 mr-2'>Dashboard</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default SuprimentosBox;