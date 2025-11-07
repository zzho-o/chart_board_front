import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout/app.layout';
import PublicOnlyRoute from '@/routes/PublicOnlyRoute';
import ProtectedRoute from '@/routes/ProtectedRoute';

import SignInPage from '@/pages/sign-in.page';
import HomePage from '@/pages/home.page';
import PostNewPage from '@/pages/posts/posts.create';
import PostEditPage from '@/pages/posts/posts.update';
import PostsPage from './pages/posts/posts.page';
import ChartsPage from './pages/charts.page';
import NotFoundPage from './not-found';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PublicOnlyRoute />}>
          <Route index element={<SignInPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<HomePage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/new" element={<PostNewPage />} />
          <Route path="posts/:id" element={<PostEditPage />} />
          <Route path="charts" element={<ChartsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
