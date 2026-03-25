import Database from 'better-sqlite3';
import path from 'path';

// เก็บไฟล์ไว้ที่ root ของโปรเจกต์ ชื่อ system.db
const dbPath = path.resolve(process.cwd(), 'system.db');
const db = new Database(dbPath);

// สร้าง Table สำหรับเก็บการตั้งค่า (ถ้ายังไม่มี)
db.exec(`
  CREATE TABLE IF NOT EXISTS system_settings (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;