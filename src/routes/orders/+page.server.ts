import db from '$lib/db';

export async function load() {
  // payments 테이블에서 모든 결제 내역을 최신순으로 조회
  const payments = db.prepare('SELECT * FROM payments ORDER BY created_at DESC').all();
  return { payments };
}