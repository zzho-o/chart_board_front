import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { apiPosts } from '@/net/api';
import PostFilters from '@/components/posts/PostFilters';
import PostCard from '@/components/posts/PostCard';
import Button from '@/components/common/ui/Button';
import { useIntersection } from '@/hooks/useIntersection';
import { useRemoveAllPosts, useRemovePost } from '@/hooks/usePosts';
import type { Post } from '@/net/type';
import { Grid, ModalBody, ModalOverlay } from '@/styles/posts.page';

const PostsPage = () => {
  const { t } = useTranslation('posts');
  const nav = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    qc.removeQueries({ queryKey: ['posts'] });
  }, [qc]);

  // 필터 상태
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'' | 'NOTICE' | 'QNA' | 'FREE'>('');
  const [sort, setSort] = useState<'createdAt' | 'title'>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  // 읽기 모달
  const [reading, setReading] = useState<Post | null>(null);

  // 쿼리 파라미터
  const baseParams = useMemo(
    () => ({
      search: search.trim() || undefined,
      category: (category || undefined) as any,
      sort,
      order,
      limit: 10,
    }),
    [search, category, sort, order],
  );

  // 무한 스크롤 쿼리
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: ['posts', baseParams],
    queryFn: ({ pageParam }) => apiPosts.list({ ...baseParams, nextCursor: pageParam }),
    getNextPageParam: last => last.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  const items = data?.pages.flatMap(p => p.items) ?? [];

  const { mutate: removeAll, isPending: removingAll } = useRemoveAllPosts();
  const { mutate: removeOne, isPending: removingOne } = useRemovePost();

  // 무한 스크롤 sentry
  const sentryRef = useIntersection({
    enabled: !!hasNextPage && !isFetchingNextPage,
    onIntersect: () => fetchNextPage(),
    rootMargin: '200px 0px',
  });

  return (
    <div style={{ maxWidth: 760, margin: '24px auto' }}>
      <h2>{t('title')}</h2>

      <PostFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        onNew={() => nav('/posts/new')}
        onClearAll={() =>
          removeAll(undefined, {
            onSuccess: () => refetch(),
          })
        }
      />

      {isLoading ? (
        <p>{t('loading')}</p>
      ) : (
        <>
          <Grid>
            {items.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onOpen={p => setReading(p)}
                onRemove={id => removeOne(id, { onSuccess: () => refetch() })}
              />
            ))}
          </Grid>

          {/* 무한 스크롤용 센트리 */}
          <div ref={sentryRef} style={{ height: 1 }} />
          {isFetchingNextPage && <p style={{ marginTop: 12 }}>{t('loading')}</p>}
          {!hasNextPage && items.length > 0 && <p style={{ marginTop: 12, color: '#9aa0a6' }}>{t('no_more')}</p>}
        </>
      )}

      {/* 읽기 모달 */}
      {reading && (
        <ModalOverlay onClick={() => setReading(null)}>
          <ModalBody onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: 0 }}>{reading.title}</h3>
            <p style={{ margin: '4px 0 0', color: '#A6A9B2' }}>
              {t(`category_${reading.category}`)} · {new Date(reading.createdAt).toLocaleString()}
            </p>
            <div style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{reading.body}</div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setReading(null)}>
                {t('btn_close', { defaultValue: '닫기' })}
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  nav(`/posts/${reading.id}`);
                  setReading(null);
                }}
              >
                {t('btn_edit')}
              </Button>
            </div>
          </ModalBody>
        </ModalOverlay>
      )}
    </div>
  );
};

export default PostsPage;
