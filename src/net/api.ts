import axios from 'axios';
import { useAuthStore } from '@/stores/store.auth';
import type {
  LoginResp,
  Post,
  PostsListResp,
  PostCreateRequest,
  PostUpdateRequest,
  DeleteResponse,
  TopCoffeeBrandsResponse,
  WeeklyMoodTrendResponse,
  CoffeeConsumptionResponse,
  PostsQueryReq,
} from './type';

// ===================== Axios 기본 설정 =====================
const BASE_URL = import.meta.env.VITE_API_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

// 요청 인터셉터: Bearer 토큰 자동 첨부
API.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: data 래핑 해제 + 401 공통 처리
API.interceptors.response.use(
  res => {
    if (res.config.responseType === 'blob') return res;
    if (res.status === 204) return undefined;
    const data = res.data;
    return data?.data ?? data;
  },
  err => {
    const status = err?.response?.status;
    const url = (err?.config?.url ?? '') as string;
    const isLogin = url.includes('/auth/login');

    if (status === 401 && !isLogin) {
      useAuthStore.getState().logout?.();
      const here = window.location.pathname + window.location.search;
      window.location.href = `/?redirect=${encodeURIComponent(here)}`;
      return Promise.reject(err);
    }
    const msg = err?.response?.data?.message || err.message || '요청 중 오류가 발생했습니다.';
    return Promise.reject(new Error(msg));
  },
);

// ===================== AUTH =====================
export const apiAuth = {
  postAuthLogin: (email: string, password: string) => API.post<LoginResp>('/auth/login', { email, password }),
};

// ===================== HEALTH =====================
export const apiHealth = {
  get: () => API.get<{ ok: boolean }>('/health'),
};

// ===================== POSTS =====================

export const apiPosts = {
  /** GET /posts : 내 포스트 목록(커서 기반) */
  list: (params: PostsQueryReq) => API.get<PostsListResp>('/posts', { params }),

  /** POST /posts : 포스트 생성(본인) */
  create: (payload: PostCreateRequest) => API.post<Post>('/posts', payload),

  /** DELETE /posts : 내 모든 포스트 삭제 */
  removeAll: () => API.delete<DeleteResponse>('/posts'),

  /** GET /posts/{id} : 단건 조회(본인) */
  get: (id: string) => API.get<Post>(`/posts/${id}`),

  /** PATCH /posts/{id} : 수정 */
  update: (id: string, patch: PostUpdateRequest) => API.patch<Post>(`/posts/${id}`, patch),

  /** DELETE /posts/{id} : 단건 삭제 */
  remove: (id: string) => API.delete<DeleteResponse>(`/posts/${id}`),
};

// ===================== MOCK (Charts) =====================
// 1) GET /mock/top-coffee-brands : [{ brand, popularity }]
export const apiTopCoffeeBrands = () => API.get<TopCoffeeBrandsResponse>('/mock/top-coffee-brands');

// 2) GET /mock/weekly-mood-trend : WeeklyMoodTrendResponse (배열)
export const apiWeeklyMoodTrend = () => API.get<WeeklyMoodTrendResponse>('/mock/weekly-mood-trend');

// 3) GET /mock/coffee-consumption : { teams: [{ team, series: [{cups,bugs,productivity}, ...]}] }
export const apiCoffeeConsumption = () => API.get<CoffeeConsumptionResponse>('/mock/coffee-consumption');
