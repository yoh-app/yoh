enum PaymentStatus {
  PENDING = 'payment-pending',
  PROCESSING = 'payment-processing',
  SUCCESS = 'payment-success',
  FAILED = 'payment-failed',
  REVERSAL = 'payment-reversal',
  WALLET = 'payment-wallet',
}

export const ORDER_STATUS = [
  { name: 'Order Pending', status: 'order-pending', serial: 1 },
  { name: 'Order Completed', status: 'order-completed', serial: 2 },
  { name: 'Order Cancelled', status: 'order-cancelled', serial: 2 },
  { name: 'Order Refunded', status: 'order-refunded', serial: 2 },
  { name: 'Order Failed', status: 'order-failed', serial: 2 },
];

export const filterOrderStatus = (
  orderStatus: any[],
  paymentStatus: PaymentStatus,
  currentStatusIndex: number
) => {
  if ([PaymentStatus.SUCCESS].includes(paymentStatus)) {
    return currentStatusIndex > 1
      ? [...orderStatus.slice(0, 1), orderStatus[currentStatusIndex]]
      : orderStatus.slice(0, 2);
  }

  return currentStatusIndex > 1
    ? [...orderStatus.slice(0, 2), orderStatus[currentStatusIndex]]
    : orderStatus.slice(0, 2);
};
