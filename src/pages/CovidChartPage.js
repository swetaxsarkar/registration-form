import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
        const recoveredObj = res.data.recovered;

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
              borderColor: "blue",
              backgroundColor: "blue"
            },
            {
              label: "Daily Deaths",
              data: getDailyData(deathsObj),
              borderColor: "red",
              backgroundColor: "red"
            },
            {
              label: "Daily Recovered",
              data: getDailyData(recoveredObj),
              borderColor: "green",
              backgroundColor: "green"
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
        COVID-19 Daily Change (Last 10 Days)
      </h2>

      <div className="card shadow">
        <div className="card-body">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Global COVID Daily Trends"
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