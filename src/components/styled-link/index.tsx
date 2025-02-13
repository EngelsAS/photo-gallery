import { AnchorHTMLAttributes, ReactNode } from "react";

interface StyledLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

const StyledLink = ({ children, href, ...rest }: StyledLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      className="underline hover:text-cyan-600 transition-colors"
      {...rest}
    >
      {children}
    </a>
  );
};

export default StyledLink;
