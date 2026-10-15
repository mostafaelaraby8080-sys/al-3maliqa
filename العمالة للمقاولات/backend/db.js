// الاتصال بقاعدة البيانات SQLite + إنشاء الجداول + بيانات أولية
const Database = require("better-sqlite3");
const db = new Database("alomalaqa.db");
db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  message TEXT,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);
CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  area INTEGER DEFAULT 0,
  deal_type TEXT DEFAULT 'للبيع'
);
`);

const count = db.prepare("SELECT COUNT(*) AS c FROM properties").get().c;
if (count === 0) {
  const seed = db.prepare(`INSERT INTO properties
    (title, location, price, category, image, bedrooms, bathrooms, area, deal_type)
    VALUES (?,?,?,?,?,?,?,?,?)`);
  const rows = [
    [
      "شقة سوبر لوكس 180م",
      "شاطئ النيل — دمياط",
      "1,850,000 ج.م",
      "شقق",
      "images/interior-living.jpg",
      3,
      2,
      180,
      "للبيع",
    ],
    [
      "فيلا مستقلة بحديقة وحمام سباحة",
      "اللاتيني — دمياط",
      "6,900,000 ج.م",
      "فلل",
      "images/villa-garden.jpg",
      5,
      4,
      420,
      "للبيع",
    ],
    [
      "دوبلكس تشطيب حديث",
      "الحي الثامن — دمياط الجديدة",
      "3,200,000 ج.م",
      "دوبلكس",
      "images/duplex-1.jpg",
      4,
      3,
      260,
      "للبيع",
    ],
    [
      "محل تجاري واجهة رئيسية",
      "شارع الجمهورية — دمياط",
      "35,000 ج.م/شهر",
      "تجاري",
      "images/mall-1.jpg",
      0,
      1,
      85,
      "للإيجار",
    ],
    [
      "شقة 120م تشطيب كامل",
      "الحي الجامعي — دمياط",
      "1,150,000 ج.م",
      "شقق",
      "images/interior-bedroom.jpg",
      2,
      1,
      120,
      "للبيع",
    ],
    [
      "دوبلكس واجهة زجاجية عصرية",
      "كفر سعد — دمياط",
      "2,750,000 ج.م",
      "دوبلكس",
      "images/duplex-2.jpg",
      4,
      3,
      240,
      "للبيع",
    ],
    [
      "مكتب إداري بالممر التجاري",
      "ميناء دمياط الجديدة",
      "18,000 ج.م/شهر",
      "تجاري",
      "images/office.jpg",
      0,
      1,
      60,
      "للإيجار",
    ],
    [
      "فيلا صف ثاني على البحر",
      "عزبة البرج — دمياط",
      "5,400,000 ج.م",
      "فلل",
      "images/villa-night.jpg",
      4,
      3,
      350,
      "للبيع",
    ],
    [
      "شقة ديلوكس إطلالة نيل",
      "كورنيش النيل — دمياط",
      "95,000 ج.م/شهر",
      "شقق",
      "images/interior-bedroom2.jpg",
      3,
      2,
      160,
      "للإيجار",
    ],
  ];
  rows.forEach((r) => seed.run(...r));
  console.log("تم إدخال العقارات التجريبية");
}

module.exports = db;
