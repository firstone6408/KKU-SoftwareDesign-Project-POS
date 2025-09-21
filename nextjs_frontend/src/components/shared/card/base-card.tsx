import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BaseCardProps } from "@/interfaces/components/card";

/**
 * BaseCard Component — ใช้แสดงข้อมูลภายใน Card UI แบบ reusable
 *
 * ✅ รองรับ 2 รูปแบบการใช้งาน:
 *
 * --- แบบปกติ (ส่ง props)
 * ```tsx
 * <BaseCard
 *   card={{ header: true, content: true }}
 *   headerTitle="หัวข้อ"
 *   headerDescription="คำอธิบาย"
 *   content={<p>เนื้อหา</p>}
 *   footer={<Button>ตกลง</Button>}
 * />
 * ```
 *``` tsx
 * --- แบบ Custom เฉพาะส่วน
 * <BaseCard
 *   card={{ header: true, content: true }}
 *   customHeader={
 *     <CardHeader className="bg-muted">
 *       <CardTitle>🎉 Custom Header</CardTitle>
 *     </CardHeader>
 *   }
 *   content={<p>Default Content</p>}
 * />
 *```
 * ❗ หมายเหตุ: หากใช้ `customHeader`, `customContent` หรือ `customFooter` จะ **แทนที่** props ปกติในส่วนนั้น
 */
export function BaseCard({
  card,
  headerTitleIcon,
  headerTitle,
  headerDescription,
  content,
  footer,

  className,
  headerClassName,
  headerTitleClassName,
  headerDescriptionClassName,
  contentClassName,
  footerClassName,

  customHeader,
  customContent,
  customFooter,
}: BaseCardProps) {
  const {
    container = true,
    header,
    content: hasContent,
    footer: hasFooter,
  } = card;

  const HeaderTitleIcon = headerTitleIcon;

  const inner = (
    <>
      {/* ถ้ามี customHeader ใช้อันนั้น, ไม่งั้น fallback */}
      {header &&
        (customHeader ?? (
          <CardHeader className={headerClassName}>
            {headerTitle && (
              <CardTitle
                className={cn(
                  "text-lg sm:text-xl",
                  headerTitleClassName,
                  HeaderTitleIcon && "flex items-center gap-2"
                )}
              >
                <span className="font-bold">
                  {HeaderTitleIcon && <HeaderTitleIcon size={20} />}
                </span>
                <span>{headerTitle}</span>
              </CardTitle>
            )}
            {headerDescription && (
              <CardDescription className={headerDescriptionClassName}>
                {headerDescription}
              </CardDescription>
            )}
          </CardHeader>
        ))}

      {hasContent &&
        (customContent ?? (
          <CardContent className={contentClassName}>{content}</CardContent>
        ))}

      {hasFooter &&
        (customFooter ?? (
          <CardFooter className={footerClassName}>{footer}</CardFooter>
        ))}
    </>
  );

  return container ? (
    <Card className={className}>{inner}</Card>
  ) : (
    <>{inner}</>
  );
}
