import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import localizedFormat from "dayjs/plugin/localizedFormat";

// // ใส่ plugin เพื่อเปรียบเทียบเวลา
// dayjs.extend(relativeTime);

// // ใส่ plugin เพื่อใส่ Auto format
// dayjs.extend(localizedFormat);

const thaiDays = [
  "วันอาทิตย์",
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัสบดี",
  "วันศุกร์",
  "วันเสาร์",
];

const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

interface FormatDateOptionType {
  style?: "dd-MM-yyyy" | "yyyy-MM-dd" | "MM-dd-yyyy";
  dateStyle?: "numeric" | "text";
  monthStyle?: "numeric" | "text";
  buddhistYear?: boolean; // พ.ศ. หรือ ค.ศ.
  fullYear?: boolean; // 2567 หรือ 67
  useSlashFormat?: boolean; // แสดงแบบ 20/05/2567
  useDashFormat?: boolean; // แสดงแบบ 20-05-2027
  showTime?: boolean; // แสดงเวลา HH:mm น. หรือไม่
}

const dateTime = {
  dayjs,
  formatDate: function (
    date: Date | null | undefined,
    options?: FormatDateOptionType
  ): string {
    if (!date) return "-";

    const {
      style = "dd-MM-yyyy",
      dateStyle = "numeric",
      monthStyle = "numeric",
      fullYear = true,
      useSlashFormat = true,
      buddhistYear = true,
      showTime = true,
      useDashFormat = false,
    } = options || {};

    const d = new Date(date);

    const day = d.getDate();
    const dayStr =
      dateStyle === "text"
        ? thaiDays[d.getDay()]
        : day.toString().padStart(2, "0");

    const monthNum = d.getMonth() + 1;
    const monthStr =
      monthStyle === "text"
        ? thaiMonths[d.getMonth()]
        : monthNum.toString().padStart(2, "0");

    let year = d.getFullYear();
    if (buddhistYear) year += 543;
    const yearStr = fullYear ? `${year}` : `${year}`.slice(-2);

    const hour = d.getHours().toString().padStart(2, "0");
    const minute = d.getMinutes().toString().padStart(2, "0");
    const timeStr = `${hour}:${minute}`;

    const dateArr: string[] = [];

    switch (style) {
      case "dd-MM-yyyy":
        dateArr.push(dayStr);
        dateArr.push(monthStr);
        dateArr.push(yearStr);
        break;
      case "MM-dd-yyyy":
        dateArr.push(monthStr);
        dateArr.push(dayStr);
        dateArr.push(yearStr);
        break;
      case "yyyy-MM-dd":
        dateArr.push(yearStr);
        dateArr.push(monthStr);
        dateArr.push(dayStr);
        break;
      default:
        break;
    }

    // ✅ ถ้า useSlashFormat เป็น true → แสดงแบบ "20/02/2567"
    let datePart: string = "";
    for (let i = 0; i < dateArr.length; i += 1) {
      const date = dateArr[i];
      if (i === dateArr.length - 1) {
        datePart += date;
        break;
      }
      if (useSlashFormat && !useDashFormat) {
        datePart += date + "/";
      } else if (useDashFormat) {
        datePart += date + "-";
      } else {
        datePart += date + " ";
      }
    }
    // const datePart1 = useSlashFormat
    //   ? `${dateArr}/${monthStr}/${yearStr}`
    //   : `${dayStr} ${monthStr} ${yearStr}`;

    return showTime ? `${datePart}, ${timeStr} น.` : datePart;
  },
};

export { dateTime };
