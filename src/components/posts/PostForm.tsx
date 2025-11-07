import { useState } from 'react';
import Button from '@/components/common/ui/Button';
import Input from '@/components/common/ui/Input';
import { hasForbiddenWords, normalizeTags, RAW_FORBIDDEN } from '@/utils/post';
import type { PostCreateRequest, PostUpdateRequest, Post } from '@/net/type';
import { useTranslation } from 'react-i18next';
import TextArea from '../common/ui/TextArea';
import { Label, Row, Wrap } from '@/styles/PostForm';

type Props =
  | { mode: 'create'; initial?: Partial<Post>; onSubmit: (payload: PostCreateRequest) => void; pending?: boolean }
  | { mode: 'edit'; initial: Post; onSubmit: (patch: PostUpdateRequest) => void; pending?: boolean };

const PostForm = (props: Props) => {
  const { t } = useTranslation('posts');
  const isEdit = props.mode === 'edit';
  const init = props.initial ?? {};
  const [title, setTitle] = useState(init.title ?? '');
  const [body, setBody] = useState(init.body ?? '');
  const [category, setCategory] = useState<'NOTICE' | 'QNA' | 'FREE'>((init as any).category ?? 'FREE');
  const [tagsInput, setTagsInput] = useState((init as any).tags?.join(', ') ?? '');
  const [err, setErr] = useState<string>('');

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    setErr('');

    if (!title.trim()) return setErr(t('err_no_title'));
    if (title.length > 80) return setErr(t('err_title_max'));
    if (!body.trim()) return setErr(t('err_no_body'));
    if (body.length > 2000) return setErr(t('err_body_max'));
    if (hasForbiddenWords(title, body, tagsInput)) return setErr(t('err_forbidden'));

    const tags = normalizeTags(tagsInput);
    if (props.mode === 'create') {
      props.onSubmit({ title, body, category, tags });
    } else {
      const patch: PostUpdateRequest = {};
      if (title !== init.title) patch.title = title;
      if (body !== init.body) patch.body = body;
      if (category !== (init as any).category) patch.category = category;
      if (JSON.stringify(tags) !== JSON.stringify((init as any).tags ?? [])) patch.tags = tags;
      if (Object.keys(patch).length === 0) return setErr(t('err_no_changes'));
      props.onSubmit(patch);
    }
  };

  return (
    <Wrap onSubmit={handleSubmit}>
      <Row>
        <Label>{t('form_title')}</Label>
        <Input value={title} onChange={e => setTitle(e.target.value)} maxLength={80} />
      </Row>

      <Row>
        <Label>{t('form_body')}</Label>
        <TextArea value={body} onChange={e => setBody(e.target.value)} maxLength={2000} size="md" variant="default" />
      </Row>

      <Row>
        <Label>{t('form_category')}</Label>
        <select value={category} onChange={e => setCategory(e.target.value as any)}>
          <option value="NOTICE">{t('category_NOTICE')}</option>
          <option value="QNA">{t('category_QNA')}</option>
          <option value="FREE">{t('category_FREE')}</option>
        </select>
      </Row>
      <span style={{ color: '#A6A9B2', fontSize: 12 }}>{body.length} / 2000</span>
      <Row>
        <Label>{t('form_tags')}</Label>
        <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder={t('form_tags_ph')} />
      </Row>

      {err && <p style={{ color: '#EF4444', marginTop: 4 }}>{err}</p>}

      <Button type="submit" size="lg" variant="primary" disabled={props.pending}>
        {props.pending ? t('submitting') : isEdit ? t('submit_edit') : t('submit_create')}
      </Button>
    </Wrap>
  );
};

export default PostForm;
