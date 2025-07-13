<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { initializeTossPaymentWidget, requestTossPayment } from '$lib/toss-payments/widget';

  export let data;

  let paymentWidget: any;
  let paymentMethodsWidget: any;

  onMount(async () => {
    paymentWidget = await initializeTossPaymentWidget();

    if (paymentWidget) {
      paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-methods',
        { value: data.product.price },
        { variantKey: 'DEFAULT' }
      );

      paymentWidget.renderAgreement('#agreement', { variantKey: 'DEFAULT' });
    }
  });

  async function handleRequestPayment() {
    try {
      if (!paymentWidget || !paymentMethodsWidget) {
        alert('결제 UI가 아직 렌더링되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      const orderId = `order-${Date.now()}`;
      const orderName = data.product.name;
      const amount = data.product.price;
      const productId = data.product.id;

      await requestTossPayment(paymentWidget, { orderId, orderName, amount, productId });
    } catch (error) {
      console.error('결제 실패:', error);
      alert('결제에 실패했습니다. 다시 시도해주세요.');
    }
  }
</script>

<div class="container mx-auto p-4">
  <button on:click={() => goto('/')} class="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
    &larr; 뒤로가기
  </button>

  <div class="flex flex-col md:flex-row gap-8">
    <div class="md:w-1/2">
      <!-- 이미지 대신 회색 박스와 텍스트 -->
      <div class="w-full h-96 bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl rounded-lg shadow-md">
        IMAGE
      </div>
    </div>
    <div class="md:w-1/2">
      <h1 class="text-4xl font-bold mb-4">{data.product.name}</h1>
      <p class="text-2xl font-bold text-blue-600 mb-4">{data.product.price.toLocaleString()}원</p>
      <p class="text-gray-700 mb-6">{data.product.description}</p>

      <div id="payment-methods" class="mb-4"></div>
      <div id="agreement" class="mb-4"></div>

      <button on:click={handleRequestPayment} class="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-200">
        {data.product.price.toLocaleString()}원 결제하기
      </button>
    </div>
  </div>
</div>