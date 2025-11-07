import Modal from '@/components/common/ui/Modal';
import Button from '@/components/common/ui/Button';
import type { Post } from '@/net/type';
import { Meta } from '@/styles/PostReadModal';

type Props = {
  post: Post | null;
  open: boolean;
  onClose: () => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
};

const PostReadModal = ({ post, open, onClose, onEdit, onRemove }: Props) => {
  if (!post) return null;

  const Right = (
    <>
      <Button size="sm" variant="ghost" onClick={() => onEdit(post.id)}>
        수정
      </Button>
      <Button size="sm" variant="danger" onClick={() => onRemove(post.id)}>
        삭제
      </Button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={post.title} Right={Right}>
      <Meta>
        {post.category} · {new Date(post.createdAt).toLocaleString()}
      </Meta>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{post.body}</div>
      {post.tags?.length ? (
        <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {post.tags.map(t => (
            <span
              key={t}
              style={{
                fontSize: 12,
                padding: '4px 8px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              #{t}
            </span>
          ))}
        </div>
      ) : null}
    </Modal>
  );
};

export default PostReadModal;
