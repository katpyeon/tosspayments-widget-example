import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

const clientKey = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY;
const customerKey = 'anonymous';

export async function initializeTossPaymentWidget() {
  if (!clientKey) {
    console.error('VITE_TOSS_PAYMENTS_CLIENT_KEY is not configured.');
    throw new Error('Toss Payments client key is missing.');
  }
  const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
  return paymentWidget;
}

export async function requestTossPayment(paymentWidget: any, orderInfo: { orderId: string; orderName: string; amount: number; productId: number }) {
  const { orderId, orderName, amount, productId } = orderInfo;
  await paymentWidget.requestPayment({
    orderId: orderId,
    orderName: orderName,
    successUrl: `${window.location.origin}/success?orderId=${orderId}&amount=${amount}&productId=${productId}`,
    failUrl: `${window.location.origin}/fail`,
  });
}