import { HTMLAttributes, ReactNode } from "react";

interface MainContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const MainContainer = ({
  children,
  className,
  ...rest
}: MainContainerProps) => {
  return (
    <div
      className={`max-w-7xl mx-auto flex flex-col gap-10 mt-10 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default MainContainer;
