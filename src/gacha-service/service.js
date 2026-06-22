import { pool } from "../shared/database.js";

function rollItem(items) {
  const total = items.reduce((sum, item) => sum + Number(item.drop_rate), 0);
  let random = Math.random() * total;
  for (const item of items) {
    random -= Number(item.drop_rate);
    if (random <= 0) return item;
  }
  return items.at(-1);
}

export async function pullGacha(username, count) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [users] = await connection.query(
      "SELECT id, gacha_remaining FROM users WHERE name = ? FOR UPDATE",
      [username]
    );
    const user = users[0];
    if (!user) {
      await connection.rollback();
      return { status: 404, error: "User not found" };
    }
    if (user.gacha_remaining < count) {
      await connection.rollback();
      return { status: 400, error: "Not enough gacha remaining" };
    }

    const [items] = await connection.query("SELECT * FROM items");
    if (!items.length) {
      await connection.rollback();
      return { status: 500, error: "No items in database" };
    }

    const results = Array.from({ length: count }, () => rollItem(items));
    const inventoryValues = results.map((item) => [user.id, item.id]);
    const historyValues = results.map((item) => [username, item.name]);

    await connection.query(
      "INSERT INTO user_inventory (user_id, item_id) VALUES ?",
      [inventoryValues]
    );
    await connection.query(
      "INSERT INTO history (user_name, item_name) VALUES ?",
      [historyValues]
    );
    await connection.query(
      "UPDATE users SET gacha_remaining = gacha_remaining - ? WHERE id = ?",
      [count, user.id]
    );
    await connection.commit();

    return {
      status: 200,
      results,
      rareItems: results
        .filter((item) => item.rarity === "A")
        .map((item) => ({ username, item: item.name, rarity: item.rarity })),
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function getGachaHistory(username, page, pageSize = 10) {
  const offset = (page - 1) * pageSize;
  const [countRows] = await pool.query(
    "SELECT COUNT(*) AS total FROM history WHERE user_name = ?",
    [username]
  );
  const [rows] = await pool.query(
    `SELECT h.id, h.item_name AS name, h.created_at, i.id AS item_id, i.rarity
     FROM history h
     LEFT JOIN items i ON i.name = h.item_name
     WHERE h.user_name = ?
     ORDER BY h.created_at DESC, h.id DESC
     LIMIT ? OFFSET ?`,
    [username, pageSize, offset]
  );
  const total = Number(countRows[0].total);
  return {
    history: rows,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    },
  };
}
