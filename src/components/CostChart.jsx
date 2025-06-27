import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const CostChart = ({ costData }) => {
  const barData = {
    labels: ['EC2 Instances', 'EBS Storage', 'Data Transfer'],
    datasets: [
      {
        label: 'Monthly Cost ($)',
        data: [
          costData.breakdown.ec2,
          costData.breakdown.storage,
          costData.breakdown.dataTransfer
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const doughnutData = {
    labels: ['EC2 Instances', 'EBS Storage', 'Data Transfer'],
    datasets: [
      {
        data: [
          costData.breakdown.ec2,
          costData.breakdown.storage,
          costData.breakdown.dataTransfer
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Cost Breakdown'
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Cost Distribution'
      }
    }
  }

  return (
    <div className="cost-charts">
      <div className="chart-container">
        <Bar data={barData} options={chartOptions} />
      </div>
      <div className="chart-container">
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
    </div>
  )
}

export default CostChart 