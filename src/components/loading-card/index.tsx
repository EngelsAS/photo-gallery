import { forwardRef } from "react";

interface IntersectionDivProps {
  height?: number;
}

const IntersectionDiv = forwardRef<HTMLDivElement, IntersectionDivProps>(
  ({ height = 288 }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full h-10"
        style={{ height: height + "px" }}
      ></div>
    );
  }
);

export default IntersectionDiv;
