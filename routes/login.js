import { Router } from "express";
const router = Router();
import { query } from "../config.js";

router.post("/", async (req, res) => {
  console.log("BODY:", req.body);
  const { username } = req.body;
  try {
    const [rows] = await query("SELECT * FROM users WHERE name = ?", [
      username,
    ]);
    let userData, userId;
    if (rows.length === 0) {
      const result = await query(
        "INSERT INTO users (name, gacha_remaining) VALUES (?, 100)",
        [username]
      );
      userId = result.insertId;
      userData = {
        name: username,
        gacha_remaining: 100,
      };
    } else {
      userId = rows[0].id;
      userData = {
        name: rows[0].name,
        gacha_remaining: rows[0].gacha_remaining,
      };
    }

    const [inventoryRows] = await query(
      "SELECT id, item_id, quantity FROM user_inventory WHERE user_id = ?",
      [userId]
    );
    res.json({ success: true, user: userData, inventory: inventoryRows });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/refresh", async (req, res) => {
  const { username } = req.query;
  try {
    const [rows] = await query("SELECT * FROM users WHERE name = ?", [
      username,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = rows[0].id;
    const userData = {
      name: rows[0].name,
      gacha_remaining: rows[0].gacha_remaining,
    };
    const [inventoryRows] = await query(
      "SELECT id, item_id, quantity FROM user_inventory WHERE user_id = ?",
      [userId]
    );
    res.json({ success: true, user: userData, inventory: inventoryRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
