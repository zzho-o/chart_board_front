/** ===================== 공통 Enum ===================== */
export type Category = 'NOTICE' | 'QNA' | 'FREE';
export type SortField = 'createdAt' | 'title';
export type SortOrder = 'asc' | 'desc';

/** ===================== AUTH ===================== */
export type User = {
  id: string;
  email: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResp = {
  token: string;
  user: User;
};

/** ===================== POSTS ===================== */
export type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: Category;
  tags: string[];
  createdAt: string;
};
export type PostsQueryReq = {
  limit?: number;
  prevCursor?: string | null;
  nextCursor?: string | null;
  sort?: SortField;
  order?: SortOrder;
  category?: Category;
  from?: string;
  to?: string;
  search?: string;
};

/** 목록 조회 쿼리 (커서 기반) */
export type PostsQuery = {
  q?: string;
  category?: Category;
  sortBy?: SortField;
  order?: SortOrder;
  limit?: number;
  cursor?: string | null;
};

export type PostsListResp = {
  items: Post[];
  nextCursor: string | null;
};

/** 생성 요청 */
export type PostCreateRequest = {
  title: string;
  body: string;
  category: Category;
  tags?: string[];
};

/** 수정 */
export type PostUpdateRequest = {
  title?: string;
  body?: string;
  category?: Category;
  tags?: string[];
};

/** 삭제 응답 */
export type DeleteResponse = {
  ok: boolean;
  deleted: number;
};

/** ===================== CHARTS(Mock) ===================== */
/** 1) /mock/top-coffee-brands */
export type TopCoffeeBrandItem = {
  brand: string;
  popularity: number;
};
export type TopCoffeeBrandsResponse = TopCoffeeBrandItem[];

/** 2) /mock/weekly-mood-trend */
export type WeeklyMoodItem = {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
};
export type WeeklyMoodTrendResponse = WeeklyMoodItem[];

/** 3) /mock/coffee-consumption */
export type CoffeeDataPoint = {
  cups: number;
  bugs: number;
  productivity: number;
};
export type CoffeeTeam = {
  team: string;
  series: CoffeeDataPoint[];
};
export type CoffeeConsumptionResponse = {
  teams: CoffeeTeam[];
};
