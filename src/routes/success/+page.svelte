<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  const orderId = $page.url.searchParams.get('orderId');
  const amount = $page.url.searchParams.get('amount');
  const productId = $page.url.searchParams.get('productId');
  const paymentKey = $page.url.searchParams.get('paymentKey');

  let confirmationStatus: 'pending' | 'success' | 'failed' = 'pending';
  let errorMessage: string | null = null;

  onMount(async () => {
    console.log('Payment Key from URL:', paymentKey); // 로그 추가

    if (!orderId || !amount || !productId || !paymentKey) {
      confirmationStatus = 'failed';
      errorMessage = '필수 결제 정보가 누락되었습니다.';
      return;
    }

    try {
      const response = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount: Number(amount), // 숫자로 변환
          productId: Number(productId), // 숫자로 변환
        }),
      });

      const result = await response.json();

      if (response.ok) {
        confirmationStatus = 'success';
      } else {
        confirmationStatus = 'failed';
        errorMessage = result.message || '결제 승인에 실패했습니다.';
        console.error('Payment confirmation failed:', result);
      }
    } catch (error) {
      confirmationStatus = 'failed';
      errorMessage = '결제 승인 중 오류가 발생했습니다.';
      console.error('Error during payment confirmation:', error);
    }
  });
</script>

<div class="container mx-auto p-4 text-center">
  {#if confirmationStatus === 'pending'}
    <h1 class="text-4xl font-bold text-gray-600 mb-4">결제 승인 중...</h1>
    <p class="text-lg text-gray-700">잠시만 기다려 주세요.</p>
  {:else if confirmationStatus === 'success'}
    <h1 class="text-4xl font-bold text-green-600 mb-4">결제 성공!</h1>
    <p class="text-lg text-gray-700 mb-2">주문번호: {orderId}</p>
    <p class="text-lg text-gray-700 mb-2">상품 ID: {productId}</p>
    <p class="text-lg text-gray-700 mb-6">결제 금액: {Number(amount).toLocaleString()}원</p>

    <div class="flex justify-center gap-4">
      <button on:click={() => goto('/')} class="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-200">
        메인 페이지로
      </button>
      <button on:click={() => goto('/orders')} class="px-6 py-3 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-200">
        결제 내역 확인
      </button>
    </div>
  {:else}
    <h1 class="text-4xl font-bold text-red-600 mb-4">결제 실패!</h1>
    <p class="text-lg text-gray-700 mb-2">오류 메시지: {errorMessage}</p>
    <div class="flex justify-center gap-4">
      <button on:click={() => goto('/')} class="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-200">
        메인 페이지로
      </button>
      <button on:click={() => history.back()} class="px-6 py-3 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-200">
        다시 시도
      </button>
    </div>
  {/if}
</div>