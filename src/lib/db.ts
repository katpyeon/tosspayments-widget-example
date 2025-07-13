import Database from 'better-sqlite3';

const db = new Database('products.db', { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    image_url TEXT
  );
`);

// payments 테이블 스키마 추가
db.exec(`
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT UNIQUE NOT NULL,
    payment_key TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

const insertProduct = db.prepare(`
  INSERT INTO products (name, price, description, image_url)
  VALUES (?, ?, ?, ?)
`);

// 결제 내역 저장 함수
export function savePayment(order_id: string, payment_key: string, product_id: number, amount: number, status: string) {
  const insertPayment = db.prepare(`
    INSERT INTO payments (order_id, payment_key, product_id, amount, status)
    VALUES (?, ?, ?, ?, ?)
  `);
  try {
    insertPayment.run(order_id, payment_key, product_id, amount, status);
    console.log(`Payment saved: ${order_id}`); // 저장 성공 로그
  } catch (e) {
    console.error(`Error saving payment ${order_id}:`, e); // 저장 실패 로그
  }
}

const products = [
  {
    name: '나이키 에어 포스 1',
    price: 129000,
    description: '나이키 에어 포스 1은 농구 코트의 아이콘으로, 스트리트웨어의 필수 아이템으로 자리매김했습니다.',
    image_url: 'dummy' // 더미 이미지로 변경
  },
  {
    name: '아디다스 스탠 스미스',
    price: 109000,
    description: '아디다스 스탠 스미스는 시대를 초월한 디자인으로 사랑받는 클래식 테니스화입니다.',
    image_url: 'dummy' // 더미 이미지로 변경
  },
  {
    name: '뉴발란스 992',
    price: 239000,
    description: '뉴발란스 992는 프리미엄 소재와 뛰어난 착용감으로 유명한 헤리티지 스니커즈입니다.',
    image_url: 'dummy' // 더미 이미지로 변경
  },
  {
    name: '컨버스 척 70',
    price: 99000,
    description: '컨버스 척 70은 오리지널 척 테일러의 디테일을 살린 프리미엄 버전입니다.',
    image_url: 'dummy' // 더미 이미지로 변경
  },
  {
    name: '반스 올드스쿨',
    price: 89000,
    description: '반스 올드스쿨은 사이드스트라이프가 특징인 클래식 스케이트 슈즈입니다.',
    image_url: 'dummy' // 더미 이미지로 변경
  }
];

// Check if products table is empty before inserting
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };

if (count.count === 0) {
  for (const product of products) {
    insertProduct.run(product.name, product.price, product.description, product.image_url);
  }
  console.log('Initial products inserted.');
} else {
  console.log('Products table already contains data. Skipping initial insertion.');
}

export default db;