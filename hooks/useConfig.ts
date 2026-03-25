import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSystemConfig() {
  const { data, error, isLoading } = useSWR('/api/set_interval', fetcher, {
    revalidateOnFocus: false, // ไม่ต้องดึงใหม่ตอนสลับหน้าจอไปมา
    dedupingInterval: 60000,   // ถ้ามีการเรียกซ้ำใน 1 นาที ให้ใช้ค่าเดิม (ลดภาระ DB)
  });

  return {
    // แปลงวินาทีเป็นมิลลิวินาที (ms) ตามที่ SWR ต้องการ
    refreshInterval: data?.refreshRate ? data.refreshRate * 1000 : 15000, 
    isLoading
  };
}