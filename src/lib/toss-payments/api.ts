import { Buffer } from 'buffer';

export async function confirmTossPayment(paymentInfo: { paymentKey: string; orderId: string; amount: number; productId: number }) {
  const { paymentKey, orderId, amount, productId } = paymentInfo;

  const secretKey = import.meta.env.VITE_TOSS_PAYMENTS_SECRET_KEY;

  if (!secretKey) {
    console.error('VITE_TOSS_PAYMENTS_SECRET_KEY is not configured.');
    throw new Error('Toss Payments secret key is missing.');
  }

  const url = 'https://api.tosspayments.com/v1/payments/confirm';
  const headers = {
    'Authorization': `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    paymentKey,
    orderId,
    amount
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  });

  const responseData = await response.json();

  if (response.ok) {
    return { success: true, data: responseData };
  } else {
    return { success: false, error: responseData };
  }
}