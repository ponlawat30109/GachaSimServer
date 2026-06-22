import { query } from "../shared/database.js";

export async function findUserByName(username) {
  const [rows] = await query(
    "SELECT id, name, gacha_remaining FROM users WHERE name = ?",
    [username]
  );
  return rows[0];
}

export async function createUser(username) {
  const [result] = await query(
    "INSERT INTO users (name, gacha_remaining) VALUES (?, 100)",
    [username]
  );
  return { id: result.insertId, name: username, gacha_remaining: 100 };
}

export async function getInventory(userId) {
  const [rows] = await query(
    "SELECT id, item_id, quantity FROM user_inventory WHERE user_id = ?",
    [userId]
  );
  return rows;
}
