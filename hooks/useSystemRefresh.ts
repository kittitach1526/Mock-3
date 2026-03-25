import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSystemRefresh() {
  // SWR จะจัดการเรื่องการดึงข้อมูลและ Cache ให้เอง
  const { data, error, isLoading, mutate } = useSWR('/api/set_interval', fetcher, {
    revalidateOnFocus: true, // กลับมาที่หน้าเว็บแล้วให้เช็คค่าใหม่
    dedupingInterval: 2000,  // ป้องกันการยิง API ซ้ำซ้อนใน 2 วินาที
  });

  // ส่งค่ากลับไปในรูปแบบที่หน้า Dashboard เข้าใจ
  return { 
    refreshRate: data?.refreshRate ?? 15, // ถ้ายังโหลดไม่เสร็จหรือไม่มีค่า ให้ใช้ 15
    isLoading,
    mutate // ส่ง mutate ออกไปเผื่อใช้สั่ง refresh manual
  };
}