<script lang="ts">
  export let data;

  // 날짜 포맷팅 함수
  function formatDate(dateString: string) {
    // SQLite의 CURRENT_TIMESTAMP는 기본적으로 UTC를 반환하지만,
    // JavaScript의 new Date()는 YYYY-MM-DD HH:MM:SS 형식을 로컬 시간으로 해석할 수 있습니다.
    // 따라서 'Z'를 붙여 UTC로 명시적으로 파싱하도록 합니다.
    const date = new Date(dateString + 'Z'); // 'Z' 추가
    return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">결제 내역</h1>

  {#if data.payments.length > 0}
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr class="bg-gray-100 border-b">
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">주문번호</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">상품 ID</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">결제금액</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">상태</th>
            <th class="py-3 px-4 text-left text-sm font-semibold text-gray-600">결제일시</th>
          </tr>
        </thead>
        <tbody>
          {#each data.payments as payment}
            <tr class="border-b last:border-b-0 hover:bg-gray-50">
              <td class="py-3 px-4 text-sm text-gray-800">{payment.order_id}</td>
              <td class="py-3 px-4 text-sm text-gray-800">{payment.product_id}</td>
              <td class="py-3 px-4 text-sm text-gray-800">{payment.amount.toLocaleString()}원</td>
              <td class="py-3 px-4 text-sm text-gray-800">{payment.status}</td>
              <td class="py-3 px-4 text-sm text-gray-800">{formatDate(payment.created_at)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p class="text-gray-600 text-center py-8">결제 내역이 없습니다.</p>
  {/if}
</div>