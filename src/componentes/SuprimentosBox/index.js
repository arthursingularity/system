import './suprimentosbox.css';

function SuprimentosBox({ isVisible, onMouseEnter, onMouseLeave }) {
  if (!isVisible) return null;

  return (
    <div className="flex justify-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="SuprimentosBox fixed bg-stam-bg-4 z-50 w-52 rounded-lg font-light text-white z-20">
        <a href='/estoqueestamparia'>
          <div className='flex justify-center items-center p-4 hover:text-stam-orange cursor-pointer'>
            <span className="material-symbols-outlined SuprimentosBoxIcon">
              package_2
            </span>
            <p className='ml-2 mr-2'>Estoque Estamparia</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default SuprimentosBox;