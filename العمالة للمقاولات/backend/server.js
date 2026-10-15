// باك إند موقع شركة العمالقة — Node.js + Express + SQLite
// التشغيل: npm install ثم npm start  ← ثم افتح http://localhost:3000
const path = require("path");
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, ".."))); // ملفات الموقع من المجلد الرئيسي

/* ============ العقارات ============ */
app.get("/api/properties", (req, res) => {
  const { category, deal } = req.query;
  let sql = "SELECT * FROM properties WHERE 1=1";
  const params = [];
  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }
  if (deal) {
    sql += " AND deal_type = ?";
    params.push(deal);
  }
  res.json(db.prepare(sql).all(...params));
});

app.get("/api/properties/:id", (req, res) => {
  const row = db
    .prepare("SELECT * FROM properties WHERE id = ?")
    .get(req.params.id);
  row ? res.json(row) : res.status(404).json({ error: "العقار غير موجود" });
});

/* ============ رسائل التواصل ============ */
app.post("/api/contact", (req, res) => {
  const { name, phone, service, message } = req.body;
  if (!name || !name.trim() || !phone || !phone.trim()) {
    return res.status(400).json({ error: "الاسم ورقم الجوال مطلوبان" });
  }
  if (!/^01[0-9]{9}$/.test(phone.trim())) {
    return res
      .status(400)
      .json({ error: "رقم الجوال المصري غير صحيح (مثال: 01012345678)" });
  }
  const info = db
    .prepare(
      "INSERT INTO messages (name, phone, service, message) VALUES (?,?,?,?)",
    )
    .run(name.trim(), phone.trim(), service || "", message || "");
  res.status(201).json({ ok: true, id: info.lastInsertRowid });
});

/* لوحة بسيطة لعرض الرسائل الواردة (حمايتها كلمة سر عبر Header في الإنتاج) */
app.get("/api/messages", (req, res) => {
  res.json(db.prepare("SELECT * FROM messages ORDER BY id DESC").all());
});

app.delete("/api/messages/:id", (req, res) => {
  db.prepare("DELETE FROM messages WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`✅ سيرفر شركة العمالقة شغال على: http://localhost:${PORT}`);
});
