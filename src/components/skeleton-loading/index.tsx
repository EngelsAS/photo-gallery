import { HTMLAttributes } from "react";

const SkeletonLoading = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={`animate-pulse bg-zinc-200 ${className}`}></div>
  );
};

export default SkeletonLoading;
