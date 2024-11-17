import './searchsuggestionVB.css';

const data = [
    { codigo: '11300800001', descricao: 'ACIONADOR 201/1201' },
    { codigo: '113008A5001', descricao: 'ACIONADOR 201/1201 - NIQUELADO' },
    { codigo: '11301800001', descricao: 'ACIONADOR 501' },
    { codigo: '113018A5001', descricao: 'ACIONADOR 501 - NIQUELADO' },
    { codigo: '11111800000', descricao: 'ALAVANCA LINGUETA 501/601' },
    { codigo: '111118A1000', descricao: 'ALAVANCA LINGUETA 501/601 - ZINCADO' },
    { codigo: '11150700001', descricao: 'ARRUELA SEGREDO CAD. SEGR. 40 MM' },
    { codigo: '111507A5001', descricao: 'ARRUELA SEGREDO CAD. SEGR. 40 MM - NIQUELADO' },
    { codigo: '11352200001', descricao: 'BUCHA 701/1701' },
    { codigo: '11358300001', descricao: 'BUCHA PROLONGADOR FECH. ELETRICA' },
    { codigo: '010401013', descricao: 'CALCO CREMALHEIRA 05' },
    { codigo: '11220800001', descricao: 'CAPA CILINDRO 201/1201' },
    { codigo: '112208A5001', descricao: 'CAPA CILINDRO 201/1201 - NIQUELADO' },
    { codigo: '11222200001', descricao: 'CAPA CILINDRO 701/1701 GRANDE' },
    { codigo: '112222A5001', descricao: 'CAPA CILINDRO 701/1701 GRANDE - NIQUELADO' },
    { codigo: '11222200002', descricao: 'CAPA CILINDRO 701/1701 PEQUENO' },
    { codigo: '112222A5002', descricao: 'CAPA CILINDRO 701/1701 PEQUENO - NIQUELADO' },
    { codigo: '11225400001', descricao: 'CAPA CILINDRO 1500' },
    { codigo: '11225300001', descricao: 'CAPA CILINDRO 1800' },
    { codigo: '11223600C08', descricao: 'CAPA MACANETA 08' },
    { codigo: '11224200C10', descricao: 'CAPA MACANETA 10' },
    { codigo: '11223600A08', descricao: 'CAPA MACANETA 12/14' },
    { codigo: '1131F700001', descricao: 'CARCACA CAD. SEGREDO 20MM LIFE COLOR' },
    { codigo: '1139J100003', descricao: 'CHAVE 800/1004/1940 LONGA (CEPO)' },
    { codigo: '11395500003', descricao: 'CHAVE 1501 (CEPO)' },
    { codigo: '11393300005', descricao: 'CHAVE Nº 4 1001/02 S/ DENTES' },
    { codigo: '11071000001', descricao: 'CILINDRO 301' },
    { codigo: '11071100002', descricao: 'CILINDRO 302' },
    { codigo: '11077600003', descricao: 'CILINDRO 303' },
    { codigo: '11077700003', descricao: 'CILINDRO 304' },
    { codigo: '11073300001', descricao: 'CILINDRO 500/1001/02/03/08' },
    { codigo: '110733A5001', descricao: 'CILINDRO 500/1001/02/03/08 - ZINCADO' },
    { codigo: '11072200001', descricao: 'CILINDRO 701 GRANDE' },
    { codigo: '110722A5001', descricao: 'CILINDRO 701 GRANDE  - NIQUELADO' },
    { codigo: '11072200002', descricao: 'CILINDRO 701 PEQUENO' },
    { codigo: '110722A5002', descricao: 'CILINDRO 701 PEQUENO - NIQUELADO' },
    { codigo: '1107E800001', descricao: 'CILINDRO 800/1004/1940' },
    { codigo: '1107E8A1001', descricao: 'CILINDRO 800/1004/1940 - ZINCADO' },
    { codigo: '11075800001', descricao: 'CILINDRO 1701 GRANDE' },
    { codigo: '110758A5001', descricao: 'CILINDRO 1701 GRANDE - NIQUELADO' },
    { codigo: '11075800002', descricao: 'CILINDRO 1701 PEQUENO' },
    { codigo: '110758A5002', descricao: 'CILINDRO 1701 PEQUENO - NIQUELADO' },
    { codigo: '11454400001', descricao: 'CUBINHO 823/1520/CLASSIC' },
    { codigo: '114544A1001', descricao: 'CUBINHO 823/1520/CLASSIC - ZINCADO' },
    { codigo: '11281800001', descricao: 'CUBO 501/600/601/620' },
    { codigo: '112818A1001', descricao: 'CUBO 501/600/601/620 - ZINCADO' },
    { codigo: '1128B400001', descricao: 'CUBO ALAV. TRINCO 500/504/800/1800' },
    { codigo: '1128B4A1001', descricao: 'CUBO ALAV. TRINCO 500/504/800/1800 - ZINCADO' },
    { codigo: '010401010', descricao: 'FERRO MACANETA CLASSIC 85MM' },
    { codigo: '11091800001', descricao: 'GORJE LING. 501/601/1500/1501/CLASSIC' },
    { codigo: '11095200001', descricao: 'GORJE LING. 504/803/1800' },
    { codigo: '110952A1001', descricao: 'GORJE LING. 504/803/1800 - ZINCADO' },
    { codigo: '11094300001', descricao: 'GORJE LING. 813/1810' },
    { codigo: '110943A1001', descricao: 'GORJE LING. 813/1810 - ZINCADO' },
    { codigo: '11092900001', descricao: 'GORJE LING. 901/902/940/950' },
    { codigo: '110929A1001', descricao: 'GORJE LING. 901/902/940/950 - ZINCADO' },
    { codigo: '11096800001', descricao: 'GORJE LING. 1004' },
    { codigo: '110968A1001', descricao: 'GORJE LING. 1004 - ZINCADO' },
    { codigo: '11099200001', descricao: 'GORJE LING. 2001' },
    { codigo: '110992A1001', descricao: 'GORJE LING. 2001 - ZINCADO' },
    { codigo: '11185400001', descricao: 'GUIA CILINDRO 1500/1501/CLASSIC' },
    { codigo: '11182900001', descricao: 'GUIA LINGUETA 901/02/05' },
    { codigo: '11183100001', descricao: 'GUIA LINGUETA 940/45' },
    { codigo: '11031800001', descricao: 'LINGUETA 501' },
    { codigo: '11035200001', descricao: 'LINGUETA 504' },
    { codigo: '1103C700001', descricao: 'LINGUETA 600' },
    { codigo: '11032000001', descricao: 'LINGUETA 601' },
    { codigo: '11032200001', descricao: 'LINGUETA 701/1701' },
    { codigo: '11032300001', descricao: 'LINGUETA 701/1701 (3P)' },
    { codigo: '110322A5001', descricao: 'LINGUETA 701/1701 - NIQUELADO' },
    { codigo: '11034200001', descricao: 'LINGUETA 803/1800' },
    { codigo: '11034300001', descricao: 'LINGUETA 813' },
    { codigo: '11034400001', descricao: 'LINGUETA 823' },
    { codigo: '11032900001', descricao: 'LINGUETA 901/940/950/1940/2003' },
    { codigo: '11033300001', descricao: 'LINGUETA 1001' },
    { codigo: '11033400001', descricao: 'LINGUETA 1002' },
    { codigo: '11033500001', descricao: 'LINGUETA 1003/1009' },
    { codigo: '11036800001', descricao: 'LINGUETA 1004' },
    { codigo: '11039800001', descricao: 'LINGUETA 1005' },
    { codigo: '1103D400001', descricao: 'LINGUETA 1005 TETRA' },
    { codigo: '11039900003', descricao: 'LINGUETA 1006 PEQUENA (ZAMAC)' },
    { codigo: '1103B600004', descricao: 'LINGUETA 1008 PEQUENA (ZAMAC)' },
    { codigo: '1103D500001', descricao: 'LINGUETA 1025' },
    { codigo: '11039200000', descricao: 'LINGUETA 2001' },
    { codigo: '11039300004', descricao: 'LINGUETA 2002 PEQUENA (ZAMAC)' },
    { codigo: '11039300001', descricao: 'LINGUETA 2002/2004' },
    { codigo: '1103A500001', descricao: 'LINGUETA CLASSIC EXTERNA' },
    { codigo: '11471800001', descricao: 'MACANETA 02 FEMEA' },
    { codigo: '11471800003', descricao: 'MACANETA 02 FEMEA FC' },
    { codigo: '11471800002', descricao: 'MACANETA 02 MACHO' },
    { codigo: '11471800004', descricao: 'MACANETA 02 MACHO FC' },
    { codigo: '11481600001', descricao: 'MACANETA 03 FEMEA' },
    { codigo: '11481600002', descricao: 'MACANETA 03 MACHO' },
    { codigo: '11584200FFR', descricao: 'MACANETA 10 FEMEA (FRISADA)' },
    { codigo: '11584200MFR', descricao: 'MACANETA 10 MACHO (FRISADA)' },
    { codigo: '11653600MDI', descricao: 'MACANETA 13 MACHO' },
    { codigo: '11C21600001', descricao: 'MACANETA 33 FEMEA' },
    { codigo: '11C21600002', descricao: 'MACANETA 33 MACHO' },
    { codigo: '11D92500FLI', descricao: 'MACANETA 41 FEMEA' },
    { codigo: '11D92500MLI', descricao: 'MACANETA 41 MACHO' },
    { codigo: '112316A1001', descricao: 'PALHETA 401 - ZINCADO' },
    { codigo: '11231600001', descricao: 'PALHETA 401/501/601/800' },
    { codigo: '1123B400001', descricao: 'PALHETA 500/1001/02/03/08 Nº 1 "U"' },
    { codigo: '1123B400002', descricao: 'PALHETA 500/1001/02/03/08 Nº 2 "L"' },
    { codigo: '11232200001', descricao: 'PALHETA 701/80/100' },
    { codigo: '11235300001', descricao: 'PALHETA 1800' },
    { codigo: '11239200001', descricao: 'PALHETA 2001/02/03/04' },
    { codigo: '112392A1001', descricao: 'PALHETA 2001/02/03/04 - ZINCADO' },
    { codigo: '11230100001', descricao: 'PALHETA CADEADO 20 MM' },
    { codigo: '11230200001', descricao: 'PALHETA CADEADO 25 MM' },
    { codigo: '11230300001', descricao: 'PALHETA CADEADO 30 MM' },
    { codigo: '11230400001', descricao: 'PALHETA CADEADO 35 MM' },
    { codigo: '11236200001', descricao: 'PALHETA CADEADO 40 MM' },
    { codigo: '11230500001', descricao: 'PALHETA CADEADO 45 MM' },
    { codigo: '1123J400001', descricao: 'PALHETA CADEADO 50 MM' },
    { codigo: '11089300003', descricao: 'PINO FIXACAO 2002/2004' },
    { codigo: '11142200001', descricao: 'PUXADOR 701/1701' },
    { codigo: '111422A5001', descricao: 'PUXADOR 701/1701 - NIQUELADO' },
    { codigo: '11160600001', descricao: 'ROLDANA CAD. SEGR. 25 MM' },
    { codigo: '11160700001', descricao: 'ROLDANA CAD. SEGR. 40 MM' },
    { codigo: '111607A5001', descricao: 'ROLDANA CAD. SEGR. 40 MM - NIQUELADO' },
    { codigo: '11291800002', descricao: 'SUPORTE MOLA 501/600/601/620' },
    { codigo: '11959600002', descricao: 'TAMPA CONTRA FECH. 2003 (COM PUX.) (COM ABA)' },
    { codigo: '1134J400001', descricao: 'TRANCA CAD. 50 MM' },
    { codigo: '1142A400001', descricao: 'TRANQUETA 620/820/950WC/1620/1820' },
    { codigo: '1142A500001', descricao: 'TRANQUETA CLASSIC WC' },
    { codigo: '1105B400001', descricao: 'TRINCO 500/504' },
    { codigo: '11051800001', descricao: 'TRINCO 501' },
    { codigo: '11052000001', descricao: 'TRINCO 600/601/620' },
    { codigo: '11052200001', descricao: 'TRINCO 701/1701' },
    { codigo: '110522A5001', descricao: 'TRINCO 701/1701 - NIQUELADO' },
    { codigo: '1105E800001', descricao: 'TRINCO 800/803/13/23/1800' },
    { codigo: '1105A500001', descricao: 'TRINCO 1500/10/20' }
]

function SearchSuggestionVB({ searchValue, onSuggestionClick }) {

    const filteredData = data.filter(item => item.descricao.includes(searchValue));

    return (
        <div>
            <div className="SearchSuggestionDivVB bg-transparent backdrop-blur-xl border border-stam-border absolute z-50 p-4">
                <div className='SearchSuggestionDiv2'>
                    <table>
                        {filteredData.map((item, index) => (
                            <tr key={index} onClick={() => onSuggestionClick(item.descricao)}>
                                <td className="pb-2 pt-2 px-3 whitespace-nowrap text-sm text-white cursor-pointer suggestion-item hover:bg-gray-700 rounded-lg tableline">
                                    {item.descricao}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SearchSuggestionVB;
