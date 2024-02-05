export class TestOrdersItemsMapper {
  static toDatabase(data: {
    id: string;
    orderId: string;
    product: {
      id: string;
      title: string;
      description: string;
      category: string;
      image: string;
      price?: any;
    };
    price: number;
    quantity: number;
  }) {
    return {
      id: data.id,
      order_id: data.orderId,
      product: data.product,
      quantity: data.quantity,
      price: data.price,
    };
  }
}
