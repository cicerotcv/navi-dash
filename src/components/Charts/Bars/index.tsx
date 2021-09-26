import {
  BarChart as RechartsBarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend
} from 'recharts';

interface IBarChartsProps {
  data: {
    [key: string]: number | string;
  }[];
  width?: number;
  height?: number;
  keyX: string;
  keyY: string;
}

export function BarChart({
  data,
  width = 600,
  height = 300,
  keyX,
  keyY
}: IBarChartsProps) {
  return (
    <RechartsBarChart width={width} height={height} data={data}>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey={keyX} />
      <YAxis dataKey={keyY} />{' '}
      <Legend
        width={100}
        wrapperStyle={{
          top: 16,
          right: 16,
          backgroundColor: '#f5f5f5',
          border: '1px solid #d5d5d5',
          borderRadius: 8,
          lineHeight: '40px'
        }}
      />
      <Bar dataKey={keyY} fill="#8884d8" />
      <Tooltip />
    </RechartsBarChart>
  );
}
