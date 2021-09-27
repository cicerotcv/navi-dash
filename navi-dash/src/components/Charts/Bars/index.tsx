import { memo, useMemo } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { CustomAxisTick } from "../helpers";

interface IBarChartsProps {
  data: {
    [key: string]: number | string;
  }[];
  unit: string;
  xLabel: string;
  yLabel: string;
  keyX: string;
  keyY: string;
}

function UnmemoizedBars({
  data,
  unit,
  xLabel,
  yLabel,
  keyX,
  keyY
}: IBarChartsProps) {
  const orderedData = useMemo(() => {
    return data.sort((a, b) => (a.sector > b.sector ? 1 : -1));
  }, [data]);
  return (
    <ResponsiveContainer height={300}>
      <RechartsBarChart data={orderedData} barGap={1} margin={{ bottom: 15 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey={keyX} type="category" padding={{ left: 10, right: 10 }}>
          <Label dy={15}>{xLabel}</Label>
        </XAxis>
        <YAxis
          dataKey={keyY}
          unit={unit}
          tick={CustomAxisTick}
          tickMargin={1}
          padding={{ top: 10, bottom: 10 }}>
          <Label angle={-90} dx={-15}>
            {yLabel}
          </Label>
        </YAxis>
        <Legend
          width={100}
          wrapperStyle={{
            top: 16,
            right: 16,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 8,
            lineHeight: "40px"
          }}
        />
        <Bar dataKey={keyY} fill="#8884d8" />
        <Tooltip />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export const BarChart = memo(UnmemoizedBars);
