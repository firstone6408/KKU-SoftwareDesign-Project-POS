import { useRef } from "react";
import { ContentNode } from "react-to-print/lib/types/ContentNode";
import { useReactToPrint } from "react-to-print";

interface UsePrintOption<T> {
  printTargetRef?: React.RefObject<T>;
}

export function usePrint<T extends ContentNode = HTMLDivElement>({
  printTargetRef,
}: UsePrintOption<T> = {}) {
  const contentRef = useRef<T>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef: printTargetRef ?? contentRef,
  });

  return {
    printTargetRef: contentRef,
    handlePrint: reactToPrintFn,
  };
}
