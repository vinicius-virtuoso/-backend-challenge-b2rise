import { ProductsRepository } from "@/app/repositories/products-repository";

export const productsGetAllService = async (
  url: string,
  page: number,
  take: number,
  category: string,
  title: string,
  min_price: number,
  max_price: number,
  productsRepository: ProductsRepository
) => {
  const titleReplace = title && decodeURIComponent(title).replaceAll("-", " ");

  const [products, total] = await productsRepository.getAll(
    page,
    take,
    category,
    titleReplace,
    min_price,
    max_price
  );

  const pagesTotal = Math.ceil(total / take);

  return {
    page,
    pagePrevious:
      page - 1 <= 0
        ? null
        : `${process.env.BASE_URL_APP}${url}?page=${page - 1}&take=${take}${
            category !== "undefined" &&
            category !== undefined &&
            category !== null &&
            category
              ? `&category=${category}`
              : ""
          }${
            title !== "undefined" &&
            title !== undefined &&
            title !== null &&
            title
              ? `&title=${title}`
              : ""
          }&min_price=${min_price}&max_price=${max_price}`,

    pageNext:
      page + 1 > pagesTotal
        ? null
        : `${process.env.BASE_URL_APP}${url}?page=${page + 1}&take=${take}${
            category !== "undefined" &&
            category !== undefined &&
            category !== null &&
            category
              ? `&category=${category}`
              : ""
          }${
            title !== "undefined" &&
            title !== undefined &&
            title !== null &&
            title
              ? `&title=${title}`
              : ""
          }&min_price=${min_price}&max_price=${max_price}`,
    count: total,
    products,
  };
};
