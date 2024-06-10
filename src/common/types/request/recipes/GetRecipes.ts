export type GetRecipesReq = {
  page?: number;
  pageSize?: number;
  categoryId?: number;
  search?: string;
  category?: string;
  calories?: number[];
  protein?: number[];
  fat?: number[];
  carbs?: number[];
  sodium?: number[];
  fiber?: number[];
  sugar?: number[];
};
