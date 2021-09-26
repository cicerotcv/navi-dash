import { Text } from 'recharts';
export function CustomAxisTick(props: any) {
  const { payload } = props;
  return (
    <Text {...props} fontSize={12}>
      {payload.value}
    </Text>
  );
}
