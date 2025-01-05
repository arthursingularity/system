import './ProgGalvaSuggestion.css'

const data = [
    { codigo: '11711000001', descricao: 'BASE CILINDRO 301/302' },
    { codigo: '11718900001', descricao: 'BASE CILINDRO 314/315' },
    { codigo: '11012300001', descricao: 'CAIXA 701-1701/100' },
    { codigo: '11012300002', descricao: 'CAIXA 701-1701/100 (3P)' },
    { codigo: '11012200001', descricao: 'CAIXA 701-1701/80' },
    { codigo: '12018300000', descricao: 'CAIXA FECHADURA ELETRICA ORBITADA' },
    { codigo: '11018200000', descricao: 'CAIXA FECHO AUTOMATICO' },
    { codigo: '1101F800001', descricao: 'CAIXA FECHO PIVOTANTE' },
    { codigo: '11122200001', descricao: 'CASTANHA 701/1701' },
    { codigo: '11122200002', descricao: 'CASTANHA 701/1701 (3P)' },
    { codigo: '11128300001', descricao: 'CASTANHA FECH. ELETRICA (AD)' },
    { codigo: '11128300002', descricao: 'CASTANHA FECH. ELET. ROLETE (AF)' },
    { codigo: '1113A000000', descricao: 'CHAPA LINGUETA 1007' },
    { codigo: '11139700001', descricao: 'CHAPA LINGUETA 2004' },
    { codigo: '11201600002', descricao: 'CONTRA TESTA 401' },
    { codigo: '1120F000002', descricao: 'CONTRA TESTA 401 (RED)' },
    { codigo: '11201609003', descricao: 'CONTRA TESTA 401 INOX 304' },
    { codigo: '11201609004', descricao: 'CONTRA TESTA 401 (RED) INOX 304' },
    { codigo: '112016J3001', descricao: 'CONTRA TESTA 401 (ABA LONGA) - INOX 304' },
    { codigo: '112016J3002', descricao: 'CONTRA TESTA 401 (RED) (ABA LONGA) - INOX 304' },
    { codigo: '112016G0002', descricao: 'CONTRA TESTA 401 (RED) - ZINCADO' },
    { codigo: '1120A600001', descricao: 'CONTRA TESTA 401 (S/ ABA) INOX 304' },
    { codigo: '1120A509002', descricao: 'CONTRA TESTA CLASSIC - INOX 304' },
    { codigo: '1120A509003', descricao: 'CONTRA TESTA CLASSIC (RED) - INOX 304' },
    { codigo: '1120A500002', descricao: 'CONTRA TESTA CLASSIC' },
    { codigo: '1120A500003', descricao: 'CONTRA TESTA CLASSIC (RED)' },
    { codigo: '11202500004', descricao: 'CONTRA TESTA SASAZAKI (DIR) - INOX 304' },
    { codigo: '11202500005', descricao: 'CONTRA TESTA SASAZAKI (ESQ) - INOX 304' },
    { codigo: '11202500003', descricao: 'CONTRA TESTA SASAZAKI (DIR)' },
    { codigo: '11202500002', descricao: 'CONTRA TESTA SASAZAKI (ESQ)' },
    { codigo: '1120H500001', descricao: 'CONTRA TESTA 601 (DIR) PIVOTANTE' },
    { codigo: '1120H500002', descricao: 'CONTRA TESTA 601 (ESQ) PIVOTANTE' },
    { codigo: '1120H500000', descricao: 'CONTRA TESTA 601 PIVOTANTE' },
    { codigo: '1120D300002', descricao: 'CONTRA TESTA 803 ROLETE' },
    { codigo: '1120D300001', descricao: 'CONTRA TESTA 803/1501 ROLETE (C/ ABA)' },
    { codigo: '11202900003', descricao: 'CONTRA TESTA 901/40/50/1940' },
    { codigo: '1120H600001', descricao: 'CONTRA TESTA - FECH. AUX. 3 PINOS' },
    { codigo: '11203300001', descricao: 'CONTRA TESTA 1001/02/03/04/07/09' },
    { codigo: '11203300002', descricao: 'CONTRA TESTA 1001/02/03/04/07/09 (RED)' },
    { codigo: '11209800001', descricao: 'CONTRA TESTA 1005/1005T/1025' },
    { codigo: '11209800002', descricao: 'CONTRA TESTA 1005/1005T/1025 (RED)' },
    { codigo: '1120A000000', descricao: 'CONTRA TESTA 1006' },
    { codigo: '1120A000001', descricao: 'CONTRA TESTA 1006 (RED)' },
    { codigo: '1120B600001', descricao: 'CONTRA TESTA 1008' },
    { codigo: '1120B600002', descricao: 'CONTRA TESTA 1008 (RED)' },
    { codigo: '11205400001', descricao: 'CONTRA TESTA 1500' },
    { codigo: '11205400002', descricao: 'CONTRA TESTA 1500 (RED)' },
    { codigo: '1120D200001', descricao: 'CONTRA TESTA 1501 ROLETE' },
    { codigo: '11241600001', descricao: 'CREMALHEIRA 05' },
    { codigo: '1126C800001', descricao: 'ESPELHO 200' },
    { codigo: '11430800001', descricao: 'ESPELHO 201/1201' },
    { codigo: '11431000001', descricao: 'ESPELHO 301-308/316-317' },
    { codigo: '11268900000', descricao: 'ESPELHO 314/315' },
    { codigo: '11261600001', descricao: 'ESPELHO 401' },
    { codigo: '11261609001', descricao: 'ESPELHO 401 - INOX 430 (S/PVC)' },
    { codigo: '11431609001', descricao: 'ESPELHO 401 ½ MAC - 901/940/950 - INOX 430 (S/PVC)' },
    { codigo: '11261809003', descricao: 'ESPELHO 501/601 - INOX 430 (S/ PVC)' },
    { codigo: '11261800002', descricao: 'ESPELHO 501/601' },
    { codigo: '11261809002', descricao: 'ESPELHO 501/601 FX - INOX 430 (S/PVC)' },
    { codigo: '112618J3001', descricao: 'ESPELHO 501/601/605 - INOX 304 (S/PVC)' },
    { codigo: '11265009005', descricao: 'ESPELHO 503/603 - INOX 430 (S/PVC)' },
    { codigo: '11265009003', descricao: 'ESPELHO 503/603 BUZIOS - INOX 430 (S/PVC)' },
    { codigo: '11265009006', descricao: 'ESPELHO 503/603 S/ MACANETA - INOX 430 (S/ PVC)' },
    { codigo: '11265000001', descricao: 'ESPELHO 503/603' },
    { codigo: '11265000002', descricao: 'ESPELHO 503/603 BUZIOS' },
    { codigo: '11265000004', descricao: 'ESPELHO 503/603 S/ MACANETA' },
    { codigo: '11265200003', descricao: 'ESPELHO 504' },
    { codigo: '11439400001', descricao: 'ESPELHO 620' },
    { codigo: '1143A200001', descricao: 'ESPELHO 623' },
    { codigo: '11262500003', descricao: 'ESPELHO 803' },
    { codigo: '11272500004', descricao: 'ESPELHO 803 FX' },
    { codigo: '11264500001', descricao: 'ESPELHO 804' },
    { codigo: '11274500002', descricao: 'ESPELHO 804 FX' },
    { codigo: '1126E400002', descricao: 'ESPELHO 805' },
    { codigo: '11432700002', descricao: 'ESPELHO 813' },
    { codigo: '11434600003', descricao: 'ESPELHO 814' },
    { codigo: '1126E500002', descricao: 'ESPELHO 815' },
    { codigo: '11432800002', descricao: 'ESPELHO 823' },
    { codigo: '11434700003', descricao: 'ESPELHO 824' },
    { codigo: '1143E800002', descricao: 'ESPELHO 825' },
    { codigo: '11433300002', descricao: 'ESPELHO 1001/04' },
    { codigo: '11433500000', descricao: 'ESPELHO 1003/1009' },
    { codigo: '1126C900001', descricao: 'ESPELHO 1200' },
    { codigo: '11266300002', descricao: 'ESPELHO 1600' },
    { codigo: '11276300002', descricao: 'ESPELHO 1600 FX' },
    { codigo: '11266400002', descricao: 'ESPELHO 1601' },
    { codigo: '11276400002', descricao: 'ESPELHO 1601 FX' },
    { codigo: '11436500002', descricao: 'ESPELHO 1610' },
    { codigo: '11436600002', descricao: 'ESPELHO 1620' },
    { codigo: '11265300003', descricao: 'ESPELHO 1800' },
    { codigo: '11275300002', descricao: 'ESPELHO 1800 FX' },
    { codigo: '11267200003', descricao: 'ESPELHO 1801' },
    { codigo: '11277200002', descricao: 'ESPELHO 1801 FX' },
    { codigo: '11267500006', descricao: 'ESPELHO 1803' },
    { codigo: '11277500006', descricao: 'ESPELHO 1803 FX' },
    { codigo: '11437300003', descricao: 'ESPELHO 1810' },
    { codigo: '11437400003', descricao: 'ESPELHO 1820' },
    { codigo: '11436700002', descricao: 'ESPELHO 1940' },
    { codigo: '11438300000', descricao: 'ESPELHO FECH. ELETRICA' },
    { codigo: '11038500004', descricao: 'LINGUETA L4' },
    { codigo: '11039901001', descricao: 'LINGUETA 1006 GRANDE (CRAVADA)' },
    { codigo: '1103B600003', descricao: 'LINGUETA 1008 GRANDE' },
    { codigo: '11039300003', descricao: 'LINGUETA 2002/2004 GRANDE' },
    { codigo: '1183E800001', descricao: 'ROSETA 800 RQ1 MAC' },
    { codigo: '11384200002', descricao: 'ROSETA 800/1600 REDONDA MAC' },
    { codigo: '11824200001', descricao: 'ROSETA 803 QUADRADA' },
    { codigo: '11414200002', descricao: 'ROSETA 803 REDONDA' },
    { codigo: '11834200001', descricao: 'ROSETA 803/813/823 QUADRADA MAC' },
    { codigo: '1182E400001', descricao: 'ROSETA 805 RQ1' },
    { codigo: '11824300001', descricao: 'ROSETA 813 QUADRADA' },
    { codigo: '11414300002', descricao: 'ROSETA 813/1610 REDONDA' },
    { codigo: '1182E500001', descricao: 'ROSETA 815 RQ1' },
    { codigo: '11824400001', descricao: 'ROSETA 823/1002/1004 QUADRADA WC' },
    { codigo: '11414400002', descricao: 'ROSETA 823/1002/1004/1620 REDONDA WC' },
    { codigo: '1182E600001', descricao: 'ROSETA 825 RQ1' },
    { codigo: '11419800002', descricao: 'ROSETA 1005 REDONDA EXT' },
    { codigo: '11416400003', descricao: 'ROSETA 1601' },
    { codigo: '11416400004', descricao: 'ROSETA CLASSIC (55) REDONDA INTERNA' },
    { codigo: '11416400001', descricao: 'ROSETA CLASSIC (55) REDONDA MAC' },
    { codigo: '11416400005', descricao: 'ROSETA CLASSIC (55) REDONDA WC' },
    { codigo: '1141H200002', descricao: 'ROSETA EURO FORTINOX REDONDA EXT' },
    { codigo: '11D2H200001', descricao: 'ROSETA EURO FORTINOX RQ2 EXT' },
    { codigo: '11D2F000001', descricao: 'ROSETA RQ2 EXT' },
    { codigo: '11D4F100001', descricao: 'ROSETA RQ2 INT' },
    { codigo: '11D3F000001', descricao: 'ROSETA RQ2 MAC' },
    { codigo: '11D5F200001', descricao: 'ROSETA RQ2 WC' },
    { codigo: '11029900001', descricao: 'TAMPA LINGUETA 1006' },
    { codigo: '1102B600002', descricao: 'TAMPA LINGUETA 1008' },
    { codigo: '11029300002', descricao: 'TAMPA LINGUETA 2002/2004' },
]

function SearchProgGalvaSuggestion({ searchValue, onSuggestionClick }) {

    const filteredData = data.filter(item => item.descricao.includes(searchValue));

    return (
        <div>
            <div className={`progGalvaSuggestion fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30`}>
                <div className="bg-stam-bg-3 border border-stam-border rounded-lg h-40 flex justify-center p-2 h-full overflow-y-auto">
                    <table className='w-full h-10'>
                        {filteredData.map((item, index) => (
                            <tr key={index} onClick={() => onSuggestionClick(item.descricao)}>
                                <td className="pb-2.5 pt-2.5 text-sm text-white suggestion-item-prog-galva cursor-pointer hover:bg-gray-700 rounded">
                                    {item.descricao}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SearchProgGalvaSuggestion