import 'axios';
import type { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
    head<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
    options<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    patch<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  }
}
