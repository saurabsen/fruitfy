export interface Fruit {
  id: number;
  name: string;
  family: string;
  genus: string;
  order: string;
  nutritions: {
    carbohydrates: number;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
  };
}

export interface FruitsState {
  fruits: Fruit[];
  loading: boolean;
  error: string | null;
}

export const initialState: FruitsState = {
  fruits: [],
  loading: false,
  error: null,
};
