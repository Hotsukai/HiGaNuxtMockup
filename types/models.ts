export type User = {
  id: number;
  name: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
};
export type ExtractionMethod = {
  id: number;
  name: string;
};
export type Bean = {
  id: number;
  name: string;
  detail: string;
  roast: {
    id: number;
    name: string;
  };
  origin: {
    id: number;
    name: string;
  };
};

export type Mesh = {
  id: number;
  name: string;
};

export type Coffee = {
  id: number;
  createdAt: string;
  bean: Bean;
  dripper: User | null;
  drinkers: Array<User> | null;
  extractionTime: number;
  extractionMethod: ExtractionMethod | null;
  mesh: Mesh | null;
  memo: string;
  powderAmount: number;
  reviewId: Array<number>;
  reviews: Array<Review> | null;
  waterAmount: number;
  waterTemperature: number;
};

export type Review = {
  id: number | null;
  bitterness: number;
  coffee: Coffee;
  feeling: string;
  reviewer: User | null;
  situation: number;
  strongness: number;
  wantRepeat: number;
  createdAt: string | null;
  updatedAt: string | null;
};
