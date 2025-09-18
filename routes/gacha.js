import { Router } from "express";
const router = Router();
import { query } from "../config.js";

let rareAnnounces = [];

router.post("/", async (req, res) => {
  const { username, count } = req.body;
  const io = req.app.get("io");

  try {
    const [userRows] = await query(
      "SELECT id, gacha_remaining FROM users WHERE name = ?",
      [username]
    );
    if (userRows.length === 0)
      return res.status(404).json({ error: "User not found" });
    const userId = userRows[0].id;
    const gachaRemaining = userRows[0].gacha_remaining;
    if (gachaRemaining < count)
      return res.status(400).json({ error: "Not enough gacha remaining" });

    const [itemRows] = await query("SELECT * FROM items");
    if (itemRows.length === 0)
      return res.status(500).json({ error: "No items in database" });

    const results = [];
    let rareItems = [];
    for (let i = 0; i < count; i++) {
      const item = rollItem(itemRows);
      results.push(item);
      await query(
        "INSERT INTO user_inventory (user_id, item_id) VALUES (?, ?)",
        [userId, item.id]
      );

      await query("INSERT INTO history (user_name, item_name) VALUES (?, ?)", [
        username,
        item.name,
      ]);

      // io.emit("History", {
      //   username,
      //   item: item.name,
      // });

      if (item.rarity && item.rarity === "A") {
        rareItems.push({ username, item: item.name, rarity: item.rarity });
        rareAnnounces.push({ username, item: item.name, rarity: item.rarity });
      }
    }

    if (rareItems.length > 0) {
      for (const rare of rareItems) {
        io.emit("RareNotify", rare);
        // Add color to username and item in console log
        console.log(
          `Congratulations! %c${rare.username}%c has pulled a %c${rare.item}%c`,
          "color: #00ff00; font-weight: bold;",
          "",
          "color: #00ff00; font-weight: bold;",
          ""
        );
      }
    }

    // console.log(
    //   `Before update: gacha_remaining=${gachaRemaining}, count=${count}`
    // );
    await query(
      "UPDATE users SET gacha_remaining = gacha_remaining - ? WHERE id = ?",
      [count, userId]
    );

    const [afterRows] = await query(
      "SELECT gacha_remaining FROM users WHERE id = ?",
      [userId]
    );
    // console.log(
    //   `After update: gacha_remaining=${afterRows[0]?.gacha_remaining}`
    // );

    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/announcements", (req, res) => {
  res.json(rareAnnounces);
});

function rollItem(items) {
  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const item of items) {
    cumulative += item.drop_rate;
    if (rand <= cumulative) return item;
  }

  return items[items.length - 1];
}

export default router;
