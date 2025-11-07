import { Outlet, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/store.auth';

const PublicOnlyRoute = () => {
  const isAuthed = useAuthStore(s => s.isAuthed);
  const location = useLocation();
  const [params] = useSearchParams();

  if (isAuthed) {
    const to = params.get('redirect') || '/home';
    return <Navigate to={to} replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default PublicOnlyRoute;
