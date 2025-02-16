import BorderedButton from "../bordered-button";
import { ReactNode, useState } from "react";

interface ShareButtonProps {
  children: ReactNode;
  url: string;
}

const ShareButton = ({ children, url }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <div className="relative h-full">
      <BorderedButton onClick={handleCopyLink}>{children}</BorderedButton>

      <div
        className={`absolute z-50 -bottom-9 whitespace-nowrap text-zinc-500 font-semibold bg-white rounded-md px-2 py-1 shadow transition-opacity ${
          copied ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Link copiado!
      </div>
    </div>
  );
};

export default ShareButton;
