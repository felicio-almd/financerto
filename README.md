# [Financerto](https://financerto.vercel.app/)

LINK PARA ACESSO: <a id="financerto">[financerto.com)](https://financerto.vercel.app/)</a>

**Descrição**: Bem-vindo ao Financerto, sua ferramenta definitiva para o controle e gerenciamento de finanças pessoais. Nosso site oferece uma interface intuitiva e fácil de usar para ajudá-lo a monitorar suas despesas, planejar seu orçamento e alcançar suas metas financeiras. Comece hoje mesmo e transforme sua maneira de lidar com dinheiro!

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Contribuição](#contribuição)

## Tecnologias Usadas
 - React: Biblioteca JavaScript para construção de interfaces de usuário.
 - Next.js: Framework React para renderização do lado do servidor e geração de sites estáticos.
 - TypeScript: Superconjunto de JavaScript que adiciona tipagem estática.
 - Tailwind CSS: Framework CSS utilitário para estilização rápida e eficiente.
 - Firebase para backend em nuvem

## Funcionalidades
- Controle de despesas e receitas.
- Armazenamento de novas transações
- Planejamento e acompanhamento de orçamento.
- Autenticação com Google.
- Armazenamento seguro de dados com Firestore.

## Instalação

Siga os passos abaixo para configurar o projeto localmente.
Você vai precisar:
- [git](https://git-scm.com/downloads)
- [node.js](https://nodejs.org/en)
- [vscode](https://code.visualstudio.com/download)
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/financerto.git
   cd financerto

2. Instale as Dependências:
    ```bash
   npm install
3. Copie o arquivo .env.example para .env e adicione suas credenciais do Firebase
    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
4. Execute
    ```bash
    npm run dev
5. Abra http://localhost:3000



## Contribuição
Fique livre para contribuir fazendo fork no projeto :)

_FEITO POR [FELICIO ALMEIDA](https://github.com/felicio-almd)_
