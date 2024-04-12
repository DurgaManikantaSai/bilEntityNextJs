type CartItemType = Prisma.CartItemGetPayload<{
  include: {
    item: true;
  };
}>;

type OrderType = Prisma.OrderGetPayload<{
  include: {
    user: true;
  };
}>;
