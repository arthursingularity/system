import React from 'react';

const LinhaTabela = ({ codigo, descricao, buttonState, onCopyClick, rowIndex }) => {
  return (
    <tr className='hover:bg-stam-bg-4'>
      <td className="px-6 py-1 text-sm font-medium border-stam-border border-b">{codigo}</td>
      <td className="py-1 pl-6 pr-5 text-sm border-l border-stam-border border-b">{descricao}</td>
      <td className="py-1 px-5 text-sm border-l border-stam-border border-b text-right">
        <button
          className={`w-20 rounded-full font-medium ${buttonState === 'Copiado!' ? 'bg-green-300 text-black' : 'bg-blue-500 text-white'} ${buttonState === 'Copiado!' ? '' : 'hover:bg-blue-600'}`}
          onClick={(e) => onCopyClick(e, rowIndex)}
          disabled={buttonState === 'Copiado!'} // Desativa o botão enquanto estiver em "Copiado!"
        >
          {buttonState || 'Copiar'}
        </button>
      </td>
    </tr>
  );
};

export default LinhaTabela;