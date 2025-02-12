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
      className={`border border-zinc-200 rounded-md py-2 px-3 text-zinc-500 flex gap-2 cursor-pointer hover:text-black hover:border-black transition-colors shadow ${className}`}
    >
      {children}
    </button>
  );
};

export default BorderedButton;
