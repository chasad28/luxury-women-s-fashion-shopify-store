import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Product } from '../backend';

export function useGetAllProducts(
  category?: string | null,
  isBestSeller?: boolean | null,
  isNewArrival?: boolean | null,
  sortBy?: string | null,
  reverse?: boolean | null
) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', category, isBestSeller, isNewArrival, sortBy, reverse],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts(
        category ?? null,
        isBestSeller ?? null,
        isNewArrival ?? null,
        sortBy ?? null,
        reverse ?? null
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductById(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Product>({
    queryKey: ['product', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error('No actor or id');
      return actor.getProductById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useSubscribeEmail() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('No actor');
      return actor.subscribeEmail(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
  });
}

export function useSubmitReview() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      productId,
      reviewer,
      rating,
      comment,
    }: {
      productId: bigint;
      reviewer: string;
      rating: bigint;
      comment: string;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.submitReview(productId, reviewer, rating, comment);
    },
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: {
      name: string;
      description: string;
      price: number;
      category: string;
      colors: string[];
      images: string[];
      stock: bigint;
      isBestSeller: boolean;
      isNewArrival: boolean;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.addProduct(
        product.name,
        product.description,
        product.price,
        product.category,
        product.colors,
        product.images,
        product.stock,
        product.isBestSeller,
        product.isNewArrival
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
