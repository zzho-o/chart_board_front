export type AuthState = {
  token: string | null;
  user: User;
  isAuthed: boolean;
  setAuth: (p: { token: string; user: User }) => void;
  logout: () => void;
};

export type User = { id: string; email: string } | null;
