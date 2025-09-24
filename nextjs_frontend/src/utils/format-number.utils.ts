export const FormatNumber = {
  /**
   * แปลงตัวเลข: ไม่มีทศนิยม -> จำนวนเต็ม, มีทศนิยม -> สูงสุด 2 ตำแหน่ง
   */
  number(value: number | string): string {
    if (value === null || value === undefined || value === "") return "";

    const num = Number(value);

    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  },
};
