import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { ResizableBox } from "react-resizable";

export default function LineChart() {
  // creating sample data (as data not given api)
  const data = [];
  const startDate = new Date();

  for (let i = 0; i < 1; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i * 10 + j);

      row.push({
        primary: newDate,
        secondary: Math.floor(Math.random() * 100) + 1,
      });
    }

    data.push({ label: `Stock rate`, data: row });
  }

  const primaryAxis = useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <ResizableBox
      width={1007}
      height={300}
      style={{ border: "2px solid #cacccb", marginBottom: "20px" }}
    >
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          defaultColors: ["brown"],
        }}
      />
    </ResizableBox>
  );
}
