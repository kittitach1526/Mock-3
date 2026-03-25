import { NextResponse } from 'next/server';
import db from '@/lib/db';

// ดึงค่า Refresh Rate ปัจจุบัน
export async function GET() {
  try {
    const row = db.prepare('SELECT value FROM system_settings WHERE id = ?').get('refresh_rate') as { value: string } | undefined;
    return NextResponse.json({ refreshRate: row ? Number(row.value) : 15 }); // default เป็น 15 ถ้าไม่มีข้อมูล
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// บันทึกค่า Refresh Rate ใหม่
export async function POST(request: Request) {
  try {
    const { refreshRate } = await request.json();

    const stmt = db.prepare(`
      INSERT INTO system_settings (id, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `);

    stmt.run('refresh_rate', refreshRate.toString());

    return NextResponse.json({ message: 'Configuration saved successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}