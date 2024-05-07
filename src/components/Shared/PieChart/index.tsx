import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

const PieChart = ({ ayeCount, noeCount }) => {
  const data = {
    datasets: [
      {
        data: [ayeCount, noeCount],
        backgroundColor: ["forestgreen", "firebrick"],
        borderColor: ["#012e31"],
        borderWidth: 1,
      },
    ],
    labels: ["Ayes", "Noes"]
  };

  return <Pie data={data} />;
};

export default PieChart;
