import db from '$lib/db';

export async function load() {
  const products = db.prepare('SELECT * FROM products').all();
  return { products };
}