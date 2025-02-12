const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto flex flex-col gap-6 mb-20">
      <h1 className="text-2xl font-semibold">Photo Gallery</h1>
      <div>
        <div className="mb-5 text-zinc-500">
          <p>
            Este projeto foi desenvolvido por{" "}
            <a
              href="https://www.linkedin.com/in/engels-antero-9a34b2226/"
              target="_blank"
              className="underline hover:text-cyan-600 transition-colors"
            >
              Engels Antero
            </a>
            , apenas com objetivo educacional.
          </p>
          <p>
            Projeto feito almejando replicar as técnicas de otimização e
            carregamento de imagem do site{" "}
            <a
              className="underline hover:text-cyan-600 transition-colors"
              href="https://unsplash.com/"
              target="_blank"
            >
              Unplash
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-300 py-5 flex justify-between text-zinc-500">
        <p>Obrigado por visitar o projeto!</p>
        <div className="flex gap-3">
          <a
            href="https://github.com/EngelsAS"
            target="_blank"
            className="underline hover:text-cyan-600 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            className="underline hover:text-cyan-600 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
