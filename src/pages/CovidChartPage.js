import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CovidChartPage() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=10")
      .then((res) => {
        const casesObj = res.data.cases;
        const deathsObj = res.data.deaths;

        const labels = Object.keys(casesObj);

        const getDailyData = (dataObj) => {
          const values = Object.values(dataObj);
          return values.map((value, index) =>
            index === 0 ? 0 : value - values[index - 1]
          );
        };

        setChartData({
          labels,
          datasets: [
            {
              label: "Daily Cases",
              data: getDailyData(casesObj),
              backgroundColor: "#4e79a7"
            },
            {
              label: "Daily Deaths",
              data: getDailyData(deathsObj),
              backgroundColor: "#e15759"
            }
          ]
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Covid API error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading chart...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        COVID-19 Daily Bar Chart (Last 10 Days)
      </h2>

      <div className="card shadow">
        <div className="card-body">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Global COVID Daily Cases & Deaths"
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CovidChartPage;
