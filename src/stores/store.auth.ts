import { create } from 'zustand';
import { AuthState, User } from './type';

const TK = 'auth_token';
const US = 'auth_user';

export const useAuthStore = create<AuthState>(set => ({
  token: localStorage.getItem(TK),
  user: (() => {
    const raw = localStorage.getItem(US);
    return raw ? (JSON.parse(raw) as User) : null;
  })(),
  isAuthed: !!localStorage.getItem(TK),

  setAuth: ({ token, user }) => {
    localStorage.setItem(TK, token);
    localStorage.setItem(US, JSON.stringify(user));
    set({ token, user, isAuthed: true });
  },

  logout: () => {
    localStorage.clear();
    set({ token: null, user: null, isAuthed: false });
  },
}));
