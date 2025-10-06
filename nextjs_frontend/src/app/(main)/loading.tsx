import { Skeleton } from "@/components/ui/skeleton";

export default function MainLoading() {
  return (
    <div className="main-container">
      <div className="grid grid-cols-5 gap-2">
        <Skeleton className="col-span-1 h-12" />
        <Skeleton className="col-span-full h-1" />
        <div className="col-span-full flex justify-between items-center">
          <Skeleton className="w-48 h-10" />
          <Skeleton className="w-48 h-10" />
        </div>
        <Skeleton className="col-span-full w-full h-96" />
      </div>
    </div>
  );
}
