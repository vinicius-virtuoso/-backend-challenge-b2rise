import { ProductsRepository } from "@/app/repositories/products-repository";

export const productsByCategory = async (
  url: string,
  category: string,
  take: number,
  page: number,
  productsRepository: ProductsRepository
) => {
  const [products, total] = await productsRepository.findByCategory(
    page,
    take,
    category
  );
  const pagesTotal = Math.ceil(total / take);

  return {
    page,
    pagePrevious:
      page - 1 <= 0
        ? null
        : `${process.env.BASE_URL_APP}${url}?page=${page - 1}&take=${take}`,

    pageNext:
      page + 1 > pagesTotal
        ? null
        : `${process.env.BASE_URL_APP}${url}?page=${page + 1}&take=${take}`,
    count: total,
    products,
  };
};
