export interface Order {
    id: number;
    orderId: string;
    user: any; // Adjust this according to your user model
    orderitems: any[]; // Adjust this according to your order item model
    orderDate: string;
    deliveryDate: string;
    shippingAddress: any; // Adjust this according to your address model
    paymentDetails: any; // Adjust this according to your payment details model
    totalPrice: number;
    totalDiscountedPrice: number;
    discount: number;
    orderStatus: string;
    totalItem: number;
    createdAt: string;
  }
  