import { HTMLAttributes, ReactNode } from "react";

interface BorderedButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const BorderedButton = ({
  children,
  className,
  ...rest
}: BorderedButtonProps) => {
  return (
    <button
      {...rest}
      className={`border h-full border-zinc-200 rounded-md text-zinc-500 cursor-pointer hover:text-black hover:border-black transition-colors shadow ${className}`}
    >
      {children}
    </button>
  );
};

export default BorderedButton;
