import { ProductsRepository } from "@/app/repositories/products-repository";

export const productsGetAllService = async (
  url: string,
  page: number,
  take: number,
  min_price: number,
  max_price: number,
  productsRepository: ProductsRepository
) => {
  const [products, total] = await productsRepository.getAll(
    page,
    take,
    min_price,
    max_price
  );

  const pagesTotal = Math.ceil(total / take);

  return {
    page,
    pagePrevious:
      page - 1 <= 0
        ? null
        : `${process.env.BASE_URL_APP}${url}?page=${page - 1}`,
    pageNext:
      page + 1 > pagesTotal
        ? null
        : `${process.env.BASE_URL_APP}${url}?page=${page + 1}`,
    count: total,
    products,
  };
};
