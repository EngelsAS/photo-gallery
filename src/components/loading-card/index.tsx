import { forwardRef } from "react";

interface LoadingCardProps {
  height?: number;
}

const LoadingCard = forwardRef<HTMLDivElement, LoadingCardProps>(
  ({ height = 288 }, ref) => {
    return (
      <div
        ref={ref}
        className="animate-pulse bg-gray-300 w-full"
        style={{ height: height + "px" }}
      ></div>
    );
  }
);

export default LoadingCard;
