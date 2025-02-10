import { forwardRef, ReactNode } from "react";

interface IntersectionDivProps {
  height?: number;
  children?: ReactNode;
}

const IntersectionDiv = forwardRef<HTMLDivElement, IntersectionDivProps>(
  ({ height = 288, children }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full h-10 flex items-center justify-center"
        style={{ height: height + "px" }}
      >
        {children}
      </div>
    );
  }
);

export default IntersectionDiv;
