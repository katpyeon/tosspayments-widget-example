import db from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(params.id);

  if (!product) {
    throw error(404, 'Product not found');
  }

  return { product };
}