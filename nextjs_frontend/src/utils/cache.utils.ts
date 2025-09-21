import { unstable_cacheLife, unstable_cacheTag } from "next/cache";

type CACHE_TAG = "customers" | "suppliers";

export function getGlobalTag(tag: CACHE_TAG) {
  return `global:${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string) {
  return `id:${id}-${tag}` as const;
}

type CacheLife =
  | "default"
  | "max"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks";

interface DynamicOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramValues: { [key: string]: any }; // object param ที่จะเช็คค่า
  life?: CacheLife; // ถ้า dynamic ใช้ life ไหน (optional)
}

interface CachingType {
  life: CacheLife;
  tag: string[] | string;
  options?: {
    dynamic?: DynamicOptions;
  };
}

export function configureCache({ life, tag, options }: CachingType) {
  // ถ้ามี dynamic ให้สร้าง tag ใหม่ โดยเอา tag หลัก + param ที่ไม่ว่าง
  if (options?.dynamic) {
    const { paramValues, life: dynamicLife = "seconds" } = options.dynamic;

    // เริ่มต้น tagList จาก tag ที่ส่งมา (ถ้าเป็น string ให้แปลงเป็น array)
    let tagList: string[] = [];
    if (typeof tag === "string") {
      tagList = [tag];
    } else if (Array.isArray(tag)) {
      tagList = [...tag];
    }

    // เพิ่ม key=value ของ param ที่มีค่า
    for (const [key, value] of Object.entries(paramValues)) {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        tagList.push(`${key}:${value}`);
      }
    }

    if (tagList.length > 1) {
      // แทน tag ด้วย tagList ที่สร้างใหม่
      tag = tagList;

      // ถ้ามี dynamicLife ให้ override life
      life = dynamicLife;
    }
  }

  switch (life) {
    case "default":
      unstable_cacheLife("default");
      break;
    case "max":
      unstable_cacheLife("max");
      break;
    case "seconds":
      unstable_cacheLife("seconds");
      break;
    case "minutes":
      unstable_cacheLife("minutes");
      break;
    case "hours":
      unstable_cacheLife("hours");
      break;
    case "days":
      unstable_cacheLife("days");
      break;
    case "weeks":
      unstable_cacheLife("weeks");
      break;
    default:
      // fallback ถ้ามี case ที่ไม่คาดคิด
      console.warn("Unknown cache life:", life);
      break;
  }
  if (Array.isArray(tag)) {
    unstable_cacheTag(...tag);
  } else {
    unstable_cacheTag(tag);
  }

  // return {
  //   tag,
  //   life,
  // };
}

// export function generateCacheTag({
//   tags,
// }: {
//   tags: (string | number | undefined)[];
// }) {
//   return tags
//     .filter((tag) => tag !== undefined && tag !== null && tag !== "")
//     .map(String)
//     .join("-");
// }
