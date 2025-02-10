import { forwardRef, ReactNode } from "react";

interface IntersectionDivProps {
  height?: number;
  children?: ReactNode;
}

const IntersectionDiv = forwardRef<HTMLDivElement, IntersectionDivProps>(
  ({ height = 288 }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full h-10 flex items-center justify-center"
        style={{ height: height + "px" }}
      ></div>
    );
  }
);

export default IntersectionDiv;
