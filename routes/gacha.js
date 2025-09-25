import { Router } from "express";
import { query } from "../config.js";
const router = Router();

// let rareAnnounces = [];

function rollItem(items) {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.drop_rate;
    if (rand <= cumulative) return item;
  }
  return items[items.length - 1];
}

async function getUser(username) {
  const [rows] = await query(
    "SELECT id, gacha_remaining FROM users WHERE name = ?",
    [username]
  );
  return rows[0];
}

async function getItems() {
  const [rows] = await query("SELECT * FROM items");
  return rows;
}

async function addInventory(userId, itemId) {
  await query("INSERT INTO user_inventory (user_id, item_id) VALUES (?, ?)", [
    userId,
    itemId,
  ]);
}

async function addHistory(username, itemName) {
  await query("INSERT INTO history (user_name, item_name) VALUES (?, ?)", [
    username,
    itemName,
  ]);
}

async function updateGachaRemaining(userId, count) {
  await query(
    "UPDATE users SET gacha_remaining = gacha_remaining - ? WHERE id = ?",
    [count, userId]
  );
}

router.post("/", async (req, res) => {
  const { username, count } = req.body;
  const io = req.app.get("io");
  try {
    const user = await getUser(username);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.gacha_remaining < count)
      return res.status(400).json({ error: "Not enough gacha remaining" });

    const items = await getItems();
    if (!items.length)
      return res.status(500).json({ error: "No items in database" });

    const results = [];
    let rareItems = [];
    for (let i = 0; i < count; i++) {
      const item = rollItem(items);
      results.push(item);
      await addInventory(user.id, item.id);
      await addHistory(username, item.name);
      if (item.rarity === "A") {
        const rare = { username, item: item.name, rarity: item.rarity };
        rareItems.push(rare);
        // rareAnnounces.push(rare);
      }
    }

    if (rareItems.length) {
      rareItems.forEach((rare) => {
        io.emit("RareNotify", rare);
        console.log(
          `Congratulations! %c${rare.username}%c has pulled a %c${rare.item}%c`,
          "color: #00ff00; font-weight: bold;",
          "",
          "color: #00ff00; font-weight: bold;",
          ""
        );
      });
    }

    await updateGachaRemaining(user.id, count);
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("/announcements", (req, res) => {
//   res.json(rareAnnounces);
// });

export default router;
