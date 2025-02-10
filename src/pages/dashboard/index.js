import './dashboard.css'
import Navbar from "../../componentes/Navbar"
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

function Dashboard() {
    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    const [chartData, setChartData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            processChartData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    const processChartData = (data) => {
        const header = data[0];  // Cabeçalho: ['DESCRIÇÃO', 'USUÁRIO', 'QUANTIDADE', 'DATA']
        const rows = data.slice(1);  // Dados sem o cabeçalho

        const userQuantities = {};
        const dates = [];

        rows.forEach(row => {
            const user = row[1];
            const quantity = parseInt(row[2], 10) || 0;
            let date;

            if (typeof row[3] === 'number') {
                // Caso a data esteja no formato serial do Excel
                date = XLSX.SSF.parse_date_code(row[3]);
                date = new Date(date.y, date.m - 1, date.d);
            } else {
                // Caso a data esteja em formato de texto (ex: "08/02/2025")
                const [day, month, year] = row[3].split('/').map(Number);
                date = new Date(year, month - 1, day);
            }

            // Verificação para datas inválidas
            if (!isNaN(date)) {
                dates.push(date);  // Armazena todas as datas válidas
            }

            dates.push(date);  // Armazena todas as datas

            if (userQuantities[user]) {
                userQuantities[user] += quantity;
            } else {
                userQuantities[user] = quantity;
            }
        });

        // Encontrar a data mais antiga e mais recente
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));

        const formattedMinDate = minDate.toLocaleDateString('pt-BR');
        const formattedMaxDate = maxDate.toLocaleDateString('pt-BR');

        const period = `${formattedMinDate} até ${formattedMaxDate}`;

        const users = Object.keys(userQuantities);
        const quantities = Object.values(userQuantities);

        setAllUsers(users);
        setSelectedUsers(users);

        setChartData({
            labels: users,
            datasets: [
                {
                    label: 'Quantidade',
                    data: quantities,
                    backgroundColor: '#FF6600',
                    borderColor: '#000000',
                    borderWidth: 1,
                },
            ],
            period: period
        });
    };

    const handleUserFilterChange = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter(u => u !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const filteredChartData = chartData ? {
        labels: chartData.labels.filter(user => selectedUsers.includes(user)),
        datasets: chartData.datasets.map(dataset => ({
            ...dataset,
            data: chartData.labels
                .map((label, index) => selectedUsers.includes(label) ? dataset.data[index] : null)
                .filter(value => value !== null)
        }))
    } : null;

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="bg-estoque-bg dashboardBg absolute border border-gray-700 rounded-3xl">
                    <div className="p-8 flex items-center space-x-1.5">
                        <span className="material-symbols-outlined SuprimentosBoxIcon text-white">
                            monitoring
                        </span>
                        <p className="text-white font-thin text-lg">Dashboard</p>
                    </div>
                    <div className='flex justify-center'>
                        <div className='absolute top-4 border border-gray-700 bg-stam-bg-3 rounded-full p-3 space-x-2 flex items-center'>
                            <label
                                htmlFor="file-upload"
                                className="px-4 h-8 flex items-center bg-stam-orange rounded-full buttonHover font-medium"
                            >
                                <img src='./imagens/excelIcon.svg' className='w-5 mr-2' />
                                Importar arquivo
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <hr className='linhaDashboard border-t border-gray-700 m-0' />
                    </div>
                    {allUsers.length < 1 && (
                        <div className='flex justify-center mt-32'>
                            <div className='absolute text-center text-white font-thin top-28 text-lg'>
                                <p>Importe um <span className='text-green-500 font-medium'>arquivo excel .xlsx</span> gerado pelo <span className='text-sky-400 font-medium'>Protheus</span> para visualizar a dashboard.</p>
                            </div>
                            <div className='flex items-center gap-8 bg-stam-bg-3 border rounded-xl border-gray-700'>
                                <img src='./imagens/totvsLogo.png' className='w-64 ml-5' />
                                <hr className='border-t-1.5 border-gray-600 w-32 m-0'/>
                                <img src='./imagens/greenExcelIcon.svg' className='w-20' />
                                <hr className='border-t-1.5 border-gray-600 w-32 m-0'/>
                                <img src='./imagens/systemlogo.png' className='w-56 ml-3 mr-8' />
                            </div>
                        </div>
                    )}
                    {allUsers.length > 0 && (
                        <div className="flex justify-center flex-wrap space-x-2 mt-5">
                            {allUsers.map(user => (
                                <button
                                    key={user}
                                    onClick={() => handleUserFilterChange(user)}
                                    className={`px-4 h-8 rounded-full buttonHover ${selectedUsers.includes(user) ? 'bg-orange-500 font-medium' : 'border border-gray-500 text-gray-200 font-light hover:bg-gray-500 hover:text-white'}`}
                                >
                                    {user}
                                </button>
                            ))}
                        </div>
                    )}

                    {filteredChartData && (
                        <div className="grafico ml-10 mt-7 border border-gray-700 bg-stam-bg-3 rounded-xl p-3">
                            <Bar
                                data={filteredChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                            labels: {
                                                color: '#FFFFFF',
                                                font: {
                                                    family: 'SF Pro Regular',
                                                    size: 14,
                                                    weight: 'normal'
                                                }
                                            }
                                        },
                                        title: {
                                            display: true,
                                            text: chartData?.period,
                                            color: '#FFFFFF',
                                            font: {
                                                family: 'SF Pro Regular',
                                                size: 18,
                                                weight: 'normal'
                                            }
                                        },
                                        tooltip: {
                                            bodyColor: '#FFFFFF',
                                            titleColor: '#FFFFFF',
                                            titleFont: {
                                                family: 'SF Pro Medium',
                                                size: 14
                                            },
                                            bodyFont: {
                                                family: 'SF Pro Regular',
                                                size: 14
                                            }
                                        },
                                        datalabels: {
                                            color: '#FFFFFF',
                                            anchor: 'end',
                                            align: 'start',
                                            font: {
                                                family: 'SF Pro Semibold',
                                                weight: 'normal',
                                                size: 15
                                            },
                                            formatter: (value) => value.toLocaleString('pt-BR')
                                        }
                                    },
                                    scales: {
                                        x: {
                                            ticks: {
                                                color: '#FFFFFF',
                                                font: {
                                                    family: 'SF Pro Regular',
                                                    size: 13
                                                }
                                            },
                                            grid: {
                                                color: '#444'
                                            }
                                        },
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                color: '#FFFFFF',
                                                font: {
                                                    family: 'SF Pro Regular',
                                                    size: 13
                                                },
                                                padding: 10
                                            },
                                            grid: {
                                                color: '#444'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Dashboard