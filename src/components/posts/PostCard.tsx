import Button from '@/components/common/ui/Button';
import { Link } from 'react-router-dom';
import type { Post } from '@/net/type';
import { useTranslation } from 'react-i18next';
import { Card, Tag, TagList } from '@/styles/PostCard';

type Props = {
  post: Post;
  onRemove: (id: string) => void;
  onOpen?: (post: Post) => void;
};

const PostCard = ({ post, onRemove, onOpen }: Props) => {
  const { t } = useTranslation('posts');

  const MAX_TAGS = 5;
  const tags = post.tags ?? [];
  const visible = tags.slice(0, MAX_TAGS);
  const rest = tags.length - visible.length;

  return (
    <Card onClick={() => onOpen?.(post)} data-aos="fade-up" data-aos-delay="0" data-aos-offset="80">
      <h3 style={{ margin: 0 }}>{post.title}</h3>
      <p style={{ margin: 0, color: '#A6A9B2' }}>
        {t(`category_${post.category}`)} · {new Date(post.createdAt).toLocaleString()}
      </p>

      <p style={{ margin: '4px 0 0' }}>{post.body}</p>

      {tags.length > 0 && (
        <TagList>
          {visible.map(tag => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
          {rest > 0 && <Tag>+{rest}</Tag>}
        </TagList>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <Link to={`/posts/${post.id}`} onClick={e => e.stopPropagation()}>
          <Button size="sm" variant="ghost">
            {t('btn_edit')}
          </Button>
        </Link>
        <Button
          size="sm"
          variant="danger"
          onClick={e => {
            e.stopPropagation();
            onRemove(post.id);
          }}
        >
          {t('btn_delete')}
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;
