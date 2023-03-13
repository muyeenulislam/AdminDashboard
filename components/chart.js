"use client";

import { useEffect, useState } from "react";
import Chart from "chart.js";

export default function CardLineChart(props) {
  const theMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let labels = [];
  for (let i = 0; i < 12; i++) {
    const future = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = theMonths[future.getMonth()];
    const year = future.getFullYear();
    labels.push(month + " / " + year);
  }
  labels = labels.reverse();

  let chartData = [];
  if (props.data) {
    for (let i = 0; i < 12 - props.data.length; i++) {
      chartData.push(0);
    }
    for (let i = 0; i < props.data.length; i++) {
      chartData.push(props.data[i].amount);
    }
    if (props.data.length !== 0) {
      // if the last element in the chart in not of the current month
      if (
        props.data[props.data.length - 1]._id.month_name !==
        monthNames[new Date().getMonth()]
      ) {
        chartData.push(0);
        chartData.shift();
      }
    }
  }

  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Max Withdraw",
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: chartData,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
          display: false,
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "black",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                // fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "black",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                // fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [chartData]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-gray-100 -z-10">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Monthly Withdrawal
              </h6>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-[400px]">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
