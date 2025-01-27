"use client";

import HighchartsReact, {
  HighchartsReactProps,
  HighchartsReactRefObject,
} from "highcharts-react-official";
import Highcharts from "highcharts";
import { Person } from "@/types";
import { useRef } from "react";
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
    legend: {
      itemStyle: {
        color: "#fedb5d81",
        fontWeight: "bold",
      },
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
      style: {
        color: "#f6b6a4",
        fontSize: "20px",
      },
    },

    xAxis: {
      categories: people?.map((p) => p.name),
      crosshair: true,
      title: {
        text: "People Names ---------->",
        style: {
          color: "#FFFFFF",
        },
      },
      accessibility: {
        description: "People",
      },
      labels: {
        style: {
          color: "#ff7474",
        },
      },
    },
    yAxis: {
      labels: {
        style: {
          color: "#ff7474",
        },
      },
      min: 0,
      title: {
        text: "Amount in Rupees ---------->",
        style: {
          color: "#FFFFFF",
        },
      },
    },
    tooltip: {
      valueSuffix: " ₹",
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          color: "#FFFFFF",
        },
      },
    },
    series: [
      {
        name: "Lends",
        data: people?.map((p) => p.lends),
        dataLabels: {
          formatter: function () {
            return this.y + " ₹";
          },
        },
      },
      {
        name: "Borrows",
        data: people?.map((p) => p.debts),
        dataLabels: {
          formatter: function () {
            return this.y + " ₹";
          },
        },
      },
    ],
    options: { loading: {} },
  };

  return (
    <div className="chartRoot">
      {people.length === 0 && (
        <div className="noChartData">
          <div className="noChartDataTitle">No data found.</div>
          <div className="noChartDataMsg">
            Please add some transactions to show here
          </div>
        </div>
      )}
      <div className={`chartParent ${people.length === 0 ? "blur" : ""}`}>
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </div>
  );
}
