import { NotFountTemplate } from "@/components/pages/not-found/not-found-template";
import {
  BackPageButton,
  ReloadPageButton,
} from "@/components/shared/button/router-button";
import { ArrowLeft, IterationCw } from "lucide-react";
import { Suspense } from "react";

export default function NotFoundPage() {
  return (
    <div className="min-h-svh flex flex-col justify-center">
      <NotFountTemplate description="ไม่พบหน้านี้">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Suspense>
            <BackPageButton>
              <ArrowLeft size={16} />
              <span>กลับไปหน้าก่อนหน้านี้</span>
            </BackPageButton>
          </Suspense>
          <Suspense>
            <ReloadPageButton>
              <IterationCw size={16} />
              <span>ลองโหลดหน้านี้อีกรอบ</span>
            </ReloadPageButton>
          </Suspense>
        </div>
      </NotFountTemplate>
    </div>
  );
}
