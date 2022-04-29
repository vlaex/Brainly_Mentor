import { Chart, registerables, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import type { Mentee } from "@typings";
import { GetMonday} from "./GetMonday";

Chart.register(...registerables);

type MenteeChartsProps = {
  dataset: number[];
  type: keyof Mentee["charts"];
}

function padNumber(num: number): string {
  return (num < 10 ? "0" : "") + num.toString();
}

export const LineChart = (props: MenteeChartsProps) => {
  let dataset = props.dataset;
  let labels = [] as string[];

  if (props.type === "weekly") {
    let currentDate = GetMonday(new Date());

    while (currentDate <= new Date()) {
      labels.push(
        padNumber(new Date(currentDate).getDate())
      );

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
  } else {
    for (let i = 1; i <= props.dataset.length; i++) {
      let n = padNumber(i);
      labels.push(props.type === "monthly" ? n : `${n}:00`);
    }
  }

  while (dataset[dataset.length - 1] === 0) dataset.pop();

  const fontOptions = { family: "ProximaNova" };
  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        ticks: { font: { ...fontOptions, size: 10 } }
      },
      y: {
        ticks: { font: { ...fontOptions, size: 11, weight: "bold" } }
      }
    },
    plugins: {
      tooltip: {
        bodyFont: fontOptions,
        titleFont: fontOptions
      },
      legend: { display: false }
    },
  };

  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <Line options={options} data={{
        labels,
        datasets: [{
          label: "",
          data: dataset,
          fill: true,
          backgroundColor: "rgb(79 179 247 / 20%)",
          borderColor: "#4fb3f6",
        }]
      }} />
    </div>
  );
};