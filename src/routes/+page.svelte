<script lang="ts">
  export let data;
</script>

<h1 class="text-3xl font-bold mb-6">상품 목록</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {#each data.products as product}
    <a href="/products/{product.id}" class="block border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      <!-- 이미지 대신 회색 박스와 텍스트 -->
      <div class="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl mb-4 rounded-md">
        IMAGE
      </div>
      <h2 class="text-xl font-semibold mb-2">{product.name}</h2>
      <p class="text-gray-700 mb-2">{product.description}</p>
      <p class="text-lg font-bold text-blue-600">{product.price.toLocaleString()}원</p>
    </a>
  {/each}
</div>