# 토스페이먼츠 SvelteKit 결제 위젯 예제

**기술 스택:** SvelteKit, TypeScript, Tailwind CSS, SQLite, Node.js

이 프로젝트는 SvelteKit을 사용하여 토스페이먼츠 결제 위젯을 통합하는 방법을 보여주는 예제입니다. 상품 목록, 상세 페이지, 결제 위젯 연동, 결제 승인 API, 결제 내역 확인 페이지를 포함합니다.

**결제 흐름 (API 호출):** 클라이언트에서 결제 위젯을 통해 결제 정보 입력 -> 토스페이먼츠 서버로 결제 요청 -> 서버에서 토스페이먼츠 API로 결제 승인 요청 -> 토스페이먼츠 서버에서 결제 승인 응답 -> 서버에서 결제 내역 DB 저장.

## 🚀 시작하기

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone [프로젝트_레포지토리_URL]
cd tosspayments-widget-exmaple/svelt-frontend
yarn install
```

### 2. 환경 변수 설정

프로젝트 루트 디렉토리 (`svelt-frontend/`)에 `.env` 파일을 생성하고 다음 내용을 추가합니다. 토스페이먼츠 개발자 센터에서 발급받은 **테스트 키**를 사용해야 합니다.

```env
# 토스페이먼츠 API 키
# 개발환경: 공개 테스트 키 사용 (현재)
# 상용환경: 토스페이먼츠 개발자센터에서 발급받은 실제 키로 교체

# 클라이언트용 결제위젯 키 (VITE_ 접두사로 브라우저에서 접근 가능)
# 개발: test_gck_docs_* (예: test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm)
# 상용: live_gck_* 형태로 교체 필요
VITE_TOSS_PAYMENTS_CLIENT_KEY=YOUR_TOSS_PAYMENTS_CLIENT_KEY

# 서버용 시크릿 키 (서버에서만 사용, 절대 클라이언트 노출 금지)
# 개발: test_gsk_docs_* (예: test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6)
# 상용: live_sk_* 형태로 교체 필요
VITE_TOSS_PAYMENTS_SECRET_KEY=YOUR_TOSS_PAYMENTS_SECRET_KEY
```

**⚠️ 중요:** `VITE_TOSS_PAYMENTS_CLIENT_KEY`와 `VITE_TOSS_PAYMENTS_SECRET_KEY`는 **동일한 상점 ID**에 속하는 키여야 합니다. 특히 `test_gck_docs_`로 시작하는 클라이언트 키는 `test_gsk_docs_`로 시작하는 시크릿 키와 쌍을 이룹니다.

### 3. 데이터베이스 초기화 및 개발 서버 실행

프로젝트를 처음 실행하거나 데이터베이스를 초기화해야 할 경우, `products.db` 파일을 삭제한 후 개발 서버를 실행합니다.

```bash
# svelt-frontend 디렉토리에서 실행
rm products.db # 데이터베이스 파일 삭제 (초기화)
yarn dev
```

`yarn dev`를 실행하면 `products.db` 파일이 자동으로 생성되고 초기 상품 데이터가 삽입됩니다.

## 📦 프로젝트 구조

```
svelt-frontend/
├── src/
│   ├── lib/
│   │   ├── db.ts                 # SQLite 데이터베이스 설정 및 상품/결제 내역 스키마
│   │   └── toss-payments/        # 토스페이먼츠 모듈
│   │       ├── api.ts            # 서버 측 결제 승인 API 로직
│   │       └── widget.ts         # 클라이언트 측 결제 위젯 초기화 및 요청 로직
│   ├── routes/
│   │   ├── +layout.svelte        # 전역 레이아웃 (헤더/푸터 포함)
│   │   ├── +page.svelte          # 상품 목록 페이지
│   │   ├── +page.server.ts       # 상품 목록 데이터 로드
│   │   ├── orders/
│   │   │   ├── +page.svelte      # 결제 내역 확인 페이지
│   │   │   └── +page.server.ts   # 결제 내역 데이터 로드
│   │   ├── products/[id]/
│   │   │   ├── +page.svelte      # 상품 상세 페이지 (결제 위젯 포함)
│   │   │   └── +page.server.ts   # 상품 상세 데이터 로드
│   │   ├── api/payment/confirm/
│   │   │   └── +server.ts        # 결제 승인 API 엔드포인트
│   │   ├── success/
│   │   │   └── +page.svelte      # 결제 성공 페이지
│   │   └── fail/
│   │       └── +page.svelte      # 결제 실패 페이지
│   └── app.css                   # Tailwind CSS 전역 스타일
├── .env                          # 환경 변수 설정
├── svelte.config.js              # SvelteKit 설정
├── .gitignore                    # Git 무시 파일
└── ...
```

## ✨ 주요 기능

*   **상품 목록 및 상세 페이지:** SQLite 데이터베이스에 저장된 상품 정보를 표시하고, 각 상품의 상세 페이지를 제공합니다.
*   **토스페이먼츠 결제 위젯 연동:** 상품 상세 페이지에서 토스페이먼츠 결제 위젯을 통해 결제를 진행합니다.
*   **서버 측 결제 승인:** SvelteKit 서버 API를 통해 토스페이먼츠 결제를 안전하게 승인합니다.
*   **결제 내역 관리:** SQLite 데이터베이스에 결제 내역을 저장하고, 결제 내역 페이지에서 조회할 수 있습니다.
*   **결제 성공/실패 페이지:** 결제 결과에 따라 사용자에게 적절한 피드백을 제공합니다.

## 💡 구현 절차 및 유의사항

### 1. 환경 변수 관리

*   `svelt-frontend/.env` 파일에 `VITE_TOSS_PAYMENTS_CLIENT_KEY`와 `VITE_TOSS_PAYMENTS_SECRET_KEY`를 설정합니다.
*   `VITE_` 접두사는 SvelteKit/Vite가 해당 변수를 클라이언트 번들에 포함시키고 `import.meta.env`를 통해 접근 가능하게 합니다.
*   `VITE_TOSS_PAYMENTS_SECRET_KEY`는 서버 사이드에서만 사용되어야 하며, 절대 클라이언트 코드에 노출되어서는 안 됩니다.

### 2. 토스페이먼츠 키 쌍 일치

*   `VITE_TOSS_PAYMENTS_CLIENT_KEY` (결제위젯 연동 키)와 `VITE_TOSS_PAYMENTS_SECRET_KEY` (결제위젯 연동 시크릿 키)는 **반드시 동일한 상점 ID에서 발급받은 쌍**이어야 합니다.
*   `test_gck_docs_`로 시작하는 클라이언트 키는 `test_gsk_docs_`로 시작하는 시크릿 키와 함께 사용해야 합니다. `test_sk_`로 시작하는 시크릿 키는 일반 API 연동에 사용되며 결제 위젯 연동에는 적합하지 않습니다.

### 3. 결제 위젯 초기화 (`src/lib/toss-payments/widget.ts`)

*   `loadPaymentWidget` 함수를 사용하여 결제 위젯을 초기화합니다.
*   `customerKey`는 비회원 결제 시 `ANONYMOUS` 또는 고유한 문자열을 사용합니다.

### 4. 결제 요청 (`src/routes/products/[id]/+page.svelte`)

*   `paymentWidget.requestPayment`를 호출하여 결제를 요청합니다.
*   `successUrl`과 `failUrl`은 결제 결과에 따라 리다이렉트될 페이지의 URL입니다. 토스페이먼츠가 `paymentKey` 등의 정보를 자동으로 쿼리 파라미터로 추가하므로, `successUrl`에 `{paymentKey}` 플레이스홀더를 직접 포함할 필요가 없습니다.

### 5. 서버 측 결제 승인 (`src/lib/toss-payments/api.ts` 및 `src/routes/api/payment/confirm/+server.ts`)

*   결제 위젯을 통한 결제는 클라이언트에서 시작되지만, **반드시 서버에서 토스페이먼츠 API를 호출하여 최종 승인**해야 합니다. 이는 보안을 위한 필수 단계입니다.
*   `confirmTossPayment` 함수는 `paymentKey`, `orderId`, `amount`를 토스페이먼츠 승인 API로 전송합니다.
*   `Authorization` 헤더는 `Basic ${Base64(secretKey + ':')}` 형식으로 구성됩니다.

### 6. 데이터베이스 연동 (`src/lib/db.ts`)

*   SQLite를 사용하여 상품 정보와 결제 내역을 저장합니다.
*   `payments` 테이블에 `order_id`, `payment_key`, `product_id`, `amount`, `status`, `created_at` 등의 필드를 포함합니다.
*   `savePayment` 함수를 통해 결제 승인 후 결제 내역을 데이터베이스에 저장합니다.

### 7. 결제 내역 표시 (`src/routes/orders/+page.svelte`)

*   데이터베이스에서 결제 내역을 조회하여 테이블 형태로 표시합니다.
*   날짜 포맷팅 시 `toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })`을 사용하여 한국 시간으로 정확하게 표시합니다.

## 🐛 문제 해결 팁

*   **환경 변수 문제:** `VITE_` 접두사가 없는 환경 변수는 클라이언트에서 `undefined`로 로드됩니다. 서버에서는 `import.meta.env`를 통해 `VITE_` 접두사가 있는 변수만 접근 가능합니다.
*   **API 키 불일치:** 클라이언트 키와 시크릿 키가 동일한 상점 ID에서 발급받은 쌍인지 확인하세요. 특히 `test_gck_docs_`와 `test_gsk_docs_` 쌍을 사용해야 합니다.
*   **`NOT_FOUND_PAYMENT_SESSION`:** 결제 위젯에서 결제 요청 후 서버에서 승인 요청이 너무 늦게 오거나, `paymentKey`가 서버로 제대로 전달되지 않았을 때 발생합니다. `successUrl`에 `paymentKey={paymentKey}`를 직접 포함하지 않도록 주의하세요.
*   **`products.db` 초기화:** 코드 변경 후 데이터베이스 스키마나 초기 데이터가 변경되었다면, `rm products.db` 명령어로 데이터베이스 파일을 삭제한 후 다시 `yarn dev`를 실행하여 초기화해야 합니다.
*   **브라우저 개발자 도구:** 콘솔 탭에서 오류 메시지를 확인하고, 네트워크 탭에서 API 요청 및 응답을 확인하여 문제의 원인을 파악하세요.

---