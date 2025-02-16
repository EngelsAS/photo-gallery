# Photo Gallery - Unsplash Clone

Este projeto é um clone do site Unsplash API, desenvolvido com o objetivo educacional de estudar e aplicar técnicas de otimização de performance e carregamento de imagens.

## Visão Geral

O projeto foi construído utilizando React Js e implementa as seguintes otimizações:

- **Blurhash:** Utilização da biblioteca Blurhash para exibir um blurPlaceholder enquanto as imagens são carregadas, melhorando a percepção de carregamento.
- **Carregamento de Imagem Gradual:** Implementação de carregamento gradual de imagens para garantir uma boa experiência para usuários com conexões de internet mais lentas.
- **Infinite Scroll:** Implementação de rolagem infinita para carregar imagens conforme o usuário interage com a página, otimizando o uso de dados e a performance.
- **Responsividade:** Design responsivo para garantir a compatibilidade e a usabilidade em diversos dispositivos.
- **Tailwind CSS:** Utilização do Tailwind CSS para estilização, garantindo a consistência e a facilidade de manutenção do design.

## Demonstração

[Photo Gallery](https://photo-gallery-self.vercel.app/)

## Tecnologias Utilizadas

- React Js
- Tailwind CSS

## Como Executar o Projeto

Siga as instruções abaixo para executar o projeto localmente:

1.  Clone o repositório:

    ```
    git clone https://github.com/EngelsAS/photo-gallery.git
    ```

2.  Navegue até o diretório do projeto:

    ```
    cd photo-gallery
    ```

3.  Instale as dependências:

    ```
    npm install ou yarn install
    ```

4.  Configure o arquivo `.env` com sua chave de acesso da Unsplash API:

    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione a seguinte linha, criando a variavel de ambiente `VITE_UNSPLASH_ACCESS_KEY` e atribua sua chave de acesso real:

      ```
      VITE_UNSPLASH_ACCESS_KEY=SUA_CHAVE_DE_ACESSO
      ```

5.  Inicie o servidor de desenvolvimento:

    ```
    npm run dev ou yarn dev
    ```

6.  Abra o seu navegador e acesse `http://localhost:3000` ou a porta que for especificada no terminal.

## Contribuição

Este é um projeto educacional, portanto, contribuições não são o foco principal. No entanto, se você tiver sugestões de melhorias ou correções, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Autor

- Engels Antero da Silva
- [LinkedIn](https://www.linkedin.com/in/engels-antero-9a34b2226/)
