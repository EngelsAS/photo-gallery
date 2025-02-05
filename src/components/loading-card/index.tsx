import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";

interface IntersectionDivProps {
  height?: number;
}

const IntersectionDiv = forwardRef<HTMLDivElement, IntersectionDivProps>(
  ({ height = 288 }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full h-10 flex items-center justify-center"
        style={{ height: height + "px" }}
      >
        <ArrowPathIcon className="size-16 animate-spin text-zinc-300" />
      </div>
    );
  }
);

export default IntersectionDiv;
