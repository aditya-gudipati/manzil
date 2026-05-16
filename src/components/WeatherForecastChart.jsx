import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeatherForecastChart({ forecastData }) {
  if (!forecastData || forecastData.length === 0) return null;

  const labels = forecastData.map(d => d.time);
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecastData.map(d => d.temp),
        borderColor: '#2D6A4F', // Green
        backgroundColor: '#2D6A4F',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Feels Like (°C)',
        data: forecastData.map(d => d.feelsLike),
        borderColor: '#7FB3D5', // Blue
        backgroundColor: '#7FB3D5',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Humidity (%)',
        data: forecastData.map(d => d.humidity),
        borderColor: '#8B5A2B', // Brown
        backgroundColor: '#8B5A2B',
        borderWidth: 2,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          font: {
            family: "'DM Sans', sans-serif"
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
              // Add description if available
              const desc = forecastData[context.dataIndex]?.description;
              if (desc && context.datasetIndex === 0) {
                label += ` (${desc})`;
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return (
    <div style={{ height: '250px', width: '100%', marginTop: '16px' }}>
      <Line options={options} data={data} key={Math.random()} /> 
      {/* key Math.random ensures destroy on re-render */}
    </div>
  );
}
