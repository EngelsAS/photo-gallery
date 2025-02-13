import StyledLink from "../styled-link";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto flex flex-col gap-6 mb-20 px-2 xl:px-0">
      <h1 className="text-2xl font-semibold">Photo Gallery</h1>
      <div>
        <div className="mb-5 text-zinc-500">
          <p>
            Este projeto foi desenvolvido por{" "}
            <StyledLink href="https://www.linkedin.com/in/engels-antero-9a34b2226/">
              Engels Antero
            </StyledLink>
            , apenas com objetivo educacional.
          </p>
          <p>
            Projeto feito almejando replicar as técnicas de otimização e
            carregamento de imagem do site{" "}
            <StyledLink href="https://unsplash.com/">Unplash</StyledLink>
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-300 py-5 flex justify-between text-zinc-500">
        <p>Obrigado por visitar o projeto!</p>
        <div className="flex gap-3">
          <StyledLink href="https://github.com/EngelsAS">GitHub</StyledLink>
          <StyledLink href="https://www.linkedin.com/feed/">
            LinkedIn
          </StyledLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
