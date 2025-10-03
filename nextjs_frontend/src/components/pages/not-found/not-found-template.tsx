import { AppLogo } from "@/components/layouts/main/app-logo";
import { FILE_CONFIG } from "@/configs/file.config";
import Image from "next/image";

interface NotFountTemplateProps {
  children: React.ReactNode;
  imageSrc?: string;
  description: string;
}

export function NotFountTemplate({
  children,
  imageSrc,
  description,
}: NotFountTemplateProps) {
  return (
    <div className="p-10 flex flex-col md:flex-row items-center gap-5">
      <div className="w-full flex justify-center">
        <Image
          className="rounded-lg shadow size-96"
          src={imageSrc || FILE_CONFIG.IMAGES.ERRORS.ERROR_3}
          width={300}
          height={300}
          priority
          alt="ภาพ error"
        />
      </div>
      <div className="w-full space-y-5">
        <div className="flex items-center gap-2">
          <AppLogo />
        </div>
        <h1 className="text-xl md:text-3xl font-extrabold text-red-600">
          ดูเหมือนว่าจะเกิดข้อผิดพลาด!
        </h1>
        <p className="text-muted-foreground text-lg">{description}</p>
        {/* Action */}
        <div>{children}</div>
      </div>
    </div>
  );
}
