import { useNavigate } from 'react-router-dom';
import PostForm from '@/components/posts/PostForm';
import { useCreatePost } from '@/hooks/usePosts';
import { useTranslation } from 'react-i18next';

const PostNewPage = () => {
  const { t } = useTranslation('posts');
  const nav = useNavigate();
  const { mutate, isPending } = useCreatePost();

  return (
    <div style={{ maxWidth: 760, margin: '24px auto' }}>
      <h2>{t('new')}</h2>
      <PostForm
        mode="create"
        pending={isPending}
        onSubmit={payload => mutate(payload, { onSuccess: () => nav('/posts') })}
      />
    </div>
  );
};
export default PostNewPage;
