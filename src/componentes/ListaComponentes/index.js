import React, { useState } from "react";
import EstampariaTable from '../estampariaTable';
import './listacomponentes.css';

function ListaComponentes({ visible, toggleVisibility }) {
    return (
        <div className="flex justify-center">
            <div className={`listaComponentes bg-stam-bg-3 p-3 rounded-2xl border border-stam-border font-light text-white ${visible ? 'visible' : ''}`}>
                <div className="listaComponentes-inner">
                    <EstampariaTable onClose={toggleVisibility} />
                </div>
            </div>
        </div>
    );
}

export default ListaComponentes;
