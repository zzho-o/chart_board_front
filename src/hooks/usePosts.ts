import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '@/net/api';
import type { PostsQueryReq, PostCreateRequest, PostUpdateRequest, PostsListResp } from '@/net/type';

export const usePostList = (params: Omit<PostsQueryReq, 'prevCursor' | 'nextCursor'> & { limit?: number }) => {
  return useInfiniteQuery({
    queryKey: ['posts', params],
    queryFn: ({ pageParam }) =>
      apiPosts.list({ ...params, limit: params.limit ?? 10, nextCursor: pageParam as string | undefined }),
    getNextPageParam: (lastPage: PostsListResp) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => apiPosts.get(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PostCreateRequest) => apiPosts.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
};

export const useUpdatePost = (id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: PostUpdateRequest) => apiPosts.update(id, patch),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['post', id] });
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useRemovePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPosts.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useRemoveAllPosts = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiPosts.removeAll(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
};
