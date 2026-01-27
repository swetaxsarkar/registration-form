import { useEffect, useState } from "react";
import { getCovidHistory } from "../api/covidApi";

const CovidChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCovidHistory();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Covid Last 10 Days Data</h2>
      {data ? JSON.stringify(data) : "Loading..."}
    </div>
  );
};

export default CovidChart;
