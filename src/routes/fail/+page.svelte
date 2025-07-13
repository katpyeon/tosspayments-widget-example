<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const code = $page.url.searchParams.get('code');
  const message = $page.url.searchParams.get('message');
</script>

<div class="container mx-auto p-4 text-center">
  <h1 class="text-4xl font-bold text-red-600 mb-4">결제 실패!</h1>
  <p class="text-lg text-gray-700 mb-2">오류 코드: {code}</p>
  <p class="text-lg text-gray-700 mb-6">오류 메시지: {message}</p>

  <div class="flex justify-center gap-4">
    <button on:click={() => goto('/')} class="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-200">
      메인 페이지로
    </button>
    <button on:click={() => history.back()} class="px-6 py-3 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-200">
      다시 시도
    </button>
  </div>
</div>