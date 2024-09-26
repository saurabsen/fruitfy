export interface Nutrition {
  calories: number;
}

export interface Fruit {
  id: number;
  name: string;
  family: string;
  order: string;
  genus: string;
  nutritions: Nutrition;
}

export interface FruitListProps {
  fruits: Fruit[];
}
