import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db, { savePayment } from '$lib/db';
import { confirmTossPayment } from '$lib/toss-payments/api'; // 변경된 부분

export const POST: RequestHandler = async ({ request }) => {
  try {
    const requestBody = await request.json();
    console.log('Request Body:', requestBody);

    const { paymentKey, orderId, amount, productId } = requestBody;

    // confirmTossPayment 함수 사용
    const { success, data, error } = await confirmTossPayment({ paymentKey, orderId, amount, productId });

    if (success) {
      console.log('Payment approved:', data);
      savePayment(orderId, paymentKey, productId, amount, 'APPROVED');
      return json({ message: 'Payment approved', data: data }, { status: 200 });
    } else {
      console.error('Payment approval failed:', error);
      return json({ message: 'Payment approval failed', error: error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing payment confirmation:', error);
    return json({ message: 'Internal server error' }, { status: 500 });
  }
};