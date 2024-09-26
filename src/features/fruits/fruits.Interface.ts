// Define a type for the slice state
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

// Define the state interface for fruits
export interface FruitsState {
  fruits: Fruit[];
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialState: FruitsState = {
  fruits: [],
  loading: false,
  error: null,
};
