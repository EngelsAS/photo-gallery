import { ReactNode } from "react";

interface BorderedBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const BorderedBox = ({ children, className, ...rest }: BorderedBoxProps) => {
  return (
    <div
      {...rest}
      className={`border border-zinc-200 rounded-md ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default BorderedBox;
