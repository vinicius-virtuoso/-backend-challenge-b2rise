import { OrdersRepository } from "@/app/repositories/orders-repository";

export const ordersGetAllService = async (
  url: string,
  page: number,
  take: number,
  userId: string,
  ordersRepository: OrdersRepository
) => {
  const [orders, total] = await ordersRepository.getAll(page, take, userId);

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
    orders,
  };
};
