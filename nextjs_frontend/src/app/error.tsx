"use client";

import { ErrorPageTemplate } from "@/components/pages/error/error-page-template";
import { BackPageButton } from "@/components/shared/button/router-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowLeft, IterationCw } from "lucide-react";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }, [error]);

  return (
    <div className="min-h-svh flex flex-col justify-center">
      <ErrorPageTemplate
        description={`เกิดข้อผิดพลาดบางอย่าง (Name: ${error.name}, Message: ${error.message})`}
      >
        {process.env.NODE_ENV === "development" && (
          <Card>
            <CardHeader>
              <CardTitle>Name: {error.name}</CardTitle>
              <CardDescription>Message: {error.message}</CardDescription>
            </CardHeader>
            <CardContent className="break-all">
              Stack: {error.stack}
            </CardContent>
          </Card>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <BackPageButton>
            <ArrowLeft size={16} />
            <span>กลับไปหน้าก่อนหน้านี้</span>
          </BackPageButton>
          <Button
            onClick={() => reset()}
            variant={"destructive"}
            className="cursor-pointer"
          >
            <IterationCw size={16} />
            <span>ลองโหลดหน้านี้อีกรอบ</span>
          </Button>
        </div>
      </ErrorPageTemplate>
    </div>
  );
}
