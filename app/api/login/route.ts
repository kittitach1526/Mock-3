//--------------------------- with db --------------------------
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import bcrypt from 'bcryptjs';

// export async function POST(req: Request) {
//   try {
//     const { username, password } = await req.json();
//     const dbName = process.env.MONGODB_DB
//     const client = await clientPromise;
//     const db = client.db(dbName);

//     // 1. ค้นหา User
//     const user = await db.collection("users").findOne({ username });
//     if (!user) {
//       return NextResponse.json({ message: "ไม่พบชื่อผู้ใช้งาน" }, { status: 401 });
//     }

//     // 2. เทียบรหัสผ่าน
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ message: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
//     }

//     // 3. ส่งข้อมูลกลับ (สามารถใช้ JWT หรือ Session เพิ่มเติมได้)
//     return NextResponse.json({
//       success: true,
//       user: { username: user.username, role: user.role }
//     });
//   } catch (error) {
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }



// -------------------------- no db --------------------------

// app/api/auth/login/route.ts


import { NextResponse } from 'next/server';

// 1. จำลองฐานข้อมูลผู้ใช้แบบ Simple Plain Text
const MOCK_USERS = [
  {
    username: "admin",
    password: "1234", // รหัสผ่านตรงๆ เลย
    role: "Administrator"
  },
  {
    username: "kai-tun", // ชื่อแฟนคุณ (ตาม Summary 😉)
    password: "456",
    role: "Operator"
  }
];

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // 1. ค้นหา User ใน Mock Data
    const user = MOCK_USERS.find(u => u.username === username);
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "ไม่พบชื่อผู้ใช้งานในระบบทดสอบ" 
      }, { status: 401 });
    }

    // 2. เทียบรหัสผ่านแบบตรงตัว (Case-sensitive)
    const isMatch = (password === user.password);

    if (!isMatch) {
      return NextResponse.json({ 
        success: false, 
        message: "รหัสผ่านไม่ถูกต้อง" 
      }, { status: 401 });
    }

    // 3. ส่งข้อมูลกลับเมื่อ Login สำเร็จ
    return NextResponse.json({
      success: true,
      user: { 
        username: user.username, 
        role: user.role,
        loginTime: new Date().toISOString()
      }
    });

  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
  