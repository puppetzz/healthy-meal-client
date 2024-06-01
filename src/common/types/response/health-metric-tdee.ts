export type HealthMetricTDEEResponse = {
  height: number;
  weight: number;
  age: number;
  gender: string;
  activityLevel: string;
  bmi: number;
  bmr: number;
  tdee: number;
  mealCaloriesRecommendation: MealCaloriesRecommendation;
  idealWeight: idealWeight;
  anotherTDEE: AnotherTDEE;
  macronutrients: MacronutrientsForGoals;
};

export type mealPerDay = {
  threeMealPerDay: number[];
  fourMealPerDay: number[];
  fiveMealPerDay: number[];
};

export type MealCaloriesRecommendation = {
  maintenance: mealPerDay;
  cutting: mealPerDay;
  bulking: mealPerDay;
};

export type idealWeight = {
  hamwi: number;
  devine: number;
  robinson: number;
  miller: number;
};

export type AnotherTDEE = {
  basalMetabolicRate?: number;
  sedentary?: number;
  lightExercise?: number;
  moderateExercise?: number;
  heavyExercise?: number;
  athlete?: number;
};

export type MacronutrientsForGoals = {
  maintenance: MacronutrientsVariants;
  cutting: MacronutrientsVariants;
  bulking: MacronutrientsVariants;
};

export type MacronutrientsVariants = {
  moderateCarbs: Macronutrients;
  lowerCarbs: Macronutrients;
  higherCarbs: Macronutrients;
};

export type Macronutrients = {
  protein: number;
  carbs: number;
  fat: number;
};
