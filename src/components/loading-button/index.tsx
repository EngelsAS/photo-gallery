import { HTMLAttributes, ReactNode } from "react";

interface LoadingButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isLoading?: boolean;
}

const LoadingButton = ({
  children,
  isLoading,
  ...rest
}: LoadingButtonProps) => {
  return (
    <button
      {...rest}
      className={`rounded-md border p-1 border-zinc-200 cursor-pointer hover:border-black  hover:text-black shadow transition-colors ${
        isLoading
          ? "animate-pulse pointer-events-none bg-stone-300 text-white"
          : "text-zinc-500"
      }`}
    >
      {children}
    </button>
  );
};

export default LoadingButton;
