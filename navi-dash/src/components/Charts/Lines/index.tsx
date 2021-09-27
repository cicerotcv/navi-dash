import { memo, useMemo } from "react";
import {
  LineChart as LineRecharts,
  Tooltip,
  CartesianGrid,
  Label,
  XAxis,
  YAxis,
  Legend,
  Line,
  ZAxis,
  ResponsiveContainer
} from "recharts";

interface ILinesProps {
  data: {
    [key: string]: number | string;
  }[];
  width?: number;
  height?: number;
  unitX?: string;
  unitY?: string;
  nameA: string;
  nameB: string;
  lineA: string;
  lineB: string;
  xLabel: string;
  yLabel: string;
  keyX?: string;
}

function UnmemoizedLines({
  data,
  unitY,
  xLabel,
  yLabel,
  nameA,
  nameB,
  lineA,
  lineB,
  keyX
}: ILinesProps) {
  // data = data.sort((a, b) => (a[keyX] > b[keyX] ? 1 : -1));

  const [dataMin, dataMax] = useMemo(() => {
    const values: number[] = data.map((item) => item[lineB] as number);
    const [min, max] = [Math.min(...values), Math.max(...values)];
    return [Math.round(100 * min) / 100, Math.round(100 * max) / 100];
  }, [data]);

  return (
    <ResponsiveContainer height={300}>
      <LineRecharts data={data} height={300} margin={{ bottom: 25 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey={keyX}
          minTickGap={10}
          tickSize={10}
          padding={{ left: 10, right: 10 }}>
          <Label dy={20}>{xLabel}</Label>
        </XAxis>
        <YAxis
          padding={{ top: 10, bottom: 10 }}
          dataKey={lineB}
          unit={unitY}
          domain={[dataMin, dataMax + 0.01]}
          type="number">
          <Label angle={-90} dx={-20}>
            {yLabel}
          </Label>
        </YAxis>
        <Legend
          width={200}
          wrapperStyle={{
            top: -40,
            right: 0,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 8,
            lineHeight: "40px"
          }}
        />
        <Line
          name={nameA}
          dataKey={lineA}
          fill="#8884d8"
          stroke="#8884d8"
          dot={{ strokeWidth: 1, r: 1 }}
          markerWidth={1}
        />
        <Line
          name={nameB}
          dataKey={lineB}
          fill="#d88488"
          stroke="#d88488"
          dot={{ strokeWidth: 1, r: 1 }}
          strokeWidth={1}
        />
        <Tooltip />
      </LineRecharts>
    </ResponsiveContainer>
  );
}

export const LinesChart = memo(UnmemoizedLines);
