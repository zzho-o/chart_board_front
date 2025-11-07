import { useParams, useNavigate } from 'react-router-dom';
import { usePost, useUpdatePost } from '@/hooks/usePosts';
import PostForm from '@/components/posts/PostForm';
import { useTranslation } from 'react-i18next';

const PostEditPage = () => {
  const { t } = useTranslation('posts');
  const { id = '' } = useParams();
  const nav = useNavigate();
  const { data, isLoading } = usePost(id);
  const { mutate, isPending } = useUpdatePost(id);

  if (isLoading) return <div style={{ maxWidth: 760, margin: '24px auto' }}>{t('loading')}</div>;
  if (!data) return <div style={{ maxWidth: 760, margin: '24px auto' }}>{t('notFound')}</div>;

  return (
    <div style={{ maxWidth: 760, margin: '24px auto' }}>
      <h2>{t('edit')}</h2>
      <PostForm
        mode="edit"
        initial={data}
        pending={isPending}
        onSubmit={patch => mutate(patch, { onSuccess: () => nav('/posts') })}
      />
    </div>
  );
};

export default PostEditPage;
