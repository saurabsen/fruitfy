import { Fruit } from "interface/Fruits";

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 128) + 128;
  const g = Math.floor(Math.random() * 128) + 128;
  const b = Math.floor(Math.random() * 128) + 128;
  return `rgb(${r}, ${g}, ${b})`;
};

export const groupBy = (
  array: Fruit[],
  key: keyof Fruit
): Record<string, Fruit[]> => {
  return array.reduce((result, currentValue) => {
    const groupKey = currentValue[key] as unknown as string;
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentValue);
    return result;
  }, {} as Record<string, Fruit[]>);
};
