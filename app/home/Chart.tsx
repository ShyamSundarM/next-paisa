"use client";

import HighchartsReact, {
  HighchartsReactProps,
  HighchartsReactRefObject,
} from "highcharts-react-official";
import Highcharts from "highcharts";
import { Person } from "@/types";
import { useRef } from "react";
import { Button } from "@heroui/react";
//import NoDataToDisplay from "highcharts/modules/no-data-to-display";
//import NoDataToDisplay from "highcharts/modules/no-data-to-display";

//NoDataToDisplay(Highcharts);

type Props = {
  people: Person[];
};

export default function Chart(props: Props) {
  var people = props.people.filter((p) => p.debts != 0 || p.lends != 0);
  var chartRef = useRef<HighchartsReactRefObject>(null);

  const options: HighchartsReactProps = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    lang: {
      noData: "No data found. Please add some transactions to show here",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        color: "#303030",
      },
    },
    title: {
      text: "Debts/Lends Overview",
      align: "center",
    },

    xAxis: {
      categories: people?.map((p) => p.name),
      crosshair: true,
      accessibility: {
        description: "People",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount in Rupees",
      },
    },
    tooltip: {
      valueSuffix: " ₹",
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Lends",
        data: people?.map((p) => p.lends),
      },
      {
        name: "Borrows",
        data: people?.map((p) => p.debts),
      },
    ],
    options: { loading: {} },
  };

  return (
    <HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />
  );
}
