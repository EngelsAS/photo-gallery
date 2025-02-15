import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-5 py-3 flex gap-3 sm:gap-6 md:gap-12 items-center border-b border-zinc-200">
      {children}
    </div>
  );
};

export default Container;
