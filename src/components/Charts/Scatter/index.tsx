import { memo } from 'react';
import {
  ScatterChart as ScatterRecharts,
  Bar,
  Tooltip,
  CartesianGrid,
  Label,
  XAxis,
  YAxis,
  Legend,
  Scatter,
  ZAxis,
  ResponsiveContainer
} from 'recharts';

interface IScatterProps {
  data: {
    [key: string]: number | string;
  }[];
  width?: number;
  height?: number;
  unitX?: string;
  unitY?: string;
  name: string;
  keyX: string;
  keyY: string;
  xLabel: string;
  yLabel: string;
  keyZ?: string;
}

function UnmemoizedScatter({
  data,
  width = 600,
  height = 300,
  unitX,
  unitY,
  xLabel,
  yLabel,
  name,
  keyX,
  keyY,
  keyZ
}: IScatterProps) {
  data = data.sort((a, b) => (a[keyX] > b[keyX] ? 1 : -1));
  return (
    <ResponsiveContainer height={300}>
      <ScatterRecharts>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey={keyX}
          minTickGap={10}
          tickSize={10}
          unit={unitX}
          tickFormatter={(value) => String(Math.round(value))}>
          <Label dy={20}>{xLabel}</Label>
        </XAxis>
        <YAxis dataKey={keyY} unit={unitY}>
          <Label angle={-90} dx={-20}>
            {yLabel}
          </Label>
        </YAxis>
        {keyZ && <ZAxis dataKey={keyZ} range={[5,10]}/>}
        <Legend
          width={200}
          wrapperStyle={{
            top: 16,
            right: 16,
            backgroundColor: '#f5f5f5',
            border: '1px solid #d5d5d5',
            borderRadius: 8,
            lineHeight: '40px'
          }}
        />
        <Scatter name={name} data={data} fill="#8884d8" />
        <Tooltip />
      </ScatterRecharts>
    </ResponsiveContainer>
  );
}

export const ScatterChart = memo(UnmemoizedScatter);
