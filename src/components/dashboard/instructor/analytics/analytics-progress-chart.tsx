import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function AnalyticsProgressChart() {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    // Tradução da série de dados para o contexto financeiro brasileiro
    series: [
      {
        name: 'Lucro',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        color: '#556DF5',
      },
    ],
    xaxis: {
      // Atualização do eixo X para anos recentes e futuros do projeto
      categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
    },
    // Sugestão: Adicionar formatação de moeda no tooltip (opcional)
    tooltip: {
        y: {
            formatter: function (val) {
                return "R$ " + val + ",00";
            }
        }
    }
  };
  
  return (
    <ApexCharts
      options={chartOptions}
      series={chartOptions.series}
      type="line"
      height={350} 
    />
  )
}