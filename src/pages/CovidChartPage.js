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

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Cases",
              data: Object.values(casesObj)
            },
            {
              label: "Deaths",
              data: Object.values(deathsObj)
            },
            {
              label: "Recovered",
              data: Object.values(recoveredObj)
            }
          ]
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log("Covid API error:", err);
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

  if (!chartData) {
    return (
      <div className="container mt-5 text-center">
        <h4>Chart Data not available</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">COVID-19 Last 10 Days Chart</h2>

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
                  text: "Global COVID Cases/Deaths/Recovered"
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
