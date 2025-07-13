<script lang="ts">
  import '../app.css'; // Tailwind CSS를 위한 전역 CSS 임포트
</script>

<div class="flex flex-col min-h-screen">
  <header class="bg-blue-600 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <a href="/" class="text-2xl font-bold">토스페이먼츠 위젯 예제</a>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/orders" class="hover:underline">결제 내역</a></li>
          <!-- 필요한 경우 여기에 다른 네비게이션 링크 추가 -->
        </ul>
      </nav>
    </div>
  </header>

  <main class="flex-grow container mx-auto p-4">
    <slot />
  </main>

  <footer class="bg-gray-800 text-white p-4 text-center">
    <div class="container mx-auto">
      <p>&copy; 2023 Toss Payments Widget Example. All rights reserved.</p>
    </div>
  </footer>
</div>