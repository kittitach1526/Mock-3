// app/api/machine/overall/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. กำหนดช่วงที่ต้องการสุ่ม (Min, Max)
    const min = 80.5;
    const max = 95.2;

    // 2. ใช้สูตรสุ่มค่าทศนิยมในช่วงที่กำหนด
    // Math.random() สุ่มค่าระหว่าง 0 ถึง 1
    // (max - min) คือระยะห่างของช่วง
    // + min คือการขยับจุดเริ่มไปที่ค่าต่ำสุดที่ต้องการ
    const randomValue = Math.random() * (max - min) + min;

    // 3. ปรับทศนิยมให้เหลือ 1 ตำแหน่ง (คืนค่าเป็น Number)
    const finalValue = parseFloat(randomValue.toFixed(2));

    // 4. ส่งกลับในรูปแบบที่ต้องการ {"overall": value}
    return NextResponse.json({
    //   overall: finalValue,
      oee: finalValue,
      avail : parseFloat((Math.random() * (100 - 80) + 80).toFixed(2)),
      perf : parseFloat((Math.random() * (100 - 80) + 80).toFixed(2)),
      qual : parseFloat((Math.random() * (100 - 80) + 80).toFixed(2)),

    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
