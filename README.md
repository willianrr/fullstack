# Projeto Fullstack

Este repositório contém a aplicação completa, dividida em dois diretórios principais:

* `back`: Backend construído em Node.js com Express.
* `front`: Frontend desenvolvido em React + Tailwind CSS com Vite.

---

## Estrutura do Projeto

```
/ (raiz do repositório)
│
├── back/        # Backend em Node.js + Express
│   ├── src/     # Código-fonte do servidor
│   ├── .env     # Variáveis de ambiente (não versionar)
│   ├── seed-admin.ts  # Script para criar conta de administrador
│   ├── package.json
│   └── ...
│
└── front/       # Frontend em React + Tailwind + Vite
    ├── src/     # Código-fonte da aplicação React
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── package.json
    └── ...
```

---

## Backend (pasta `back`)

O backend foi implementado em Node.js usando o framework Express.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `back` com as seguintes variáveis:

```env
ADMIN_EMAIL=seu@email.com
ADMIN_PASSWORD=senhaSuperSegura
```

Essas credenciais serão usadas pelo script de seed para criar um usuário Super Admin.

### Script de Seed

Dentro da pasta `back`, existe o arquivo `seed-admin.ts`. Execute-o para gerar automaticamente a conta de administrador:

```bash
# Navegue até a pasta do backend
target$ cd back

# Instale as dependências (se ainda não instalou)
target/back$ npm install

# Execute o script de seed

target/back$ npx ts-node seed-admin.ts
```

Após a execução, a conta de Super Admin estará disponível no banco de dados com o email e senha configurados no `.env`.

---

## Frontend (pasta `front`)

O frontend utiliza React, Tailwind CSS e Vite como bundler.

### Inicialização

```bash
# Navegue até a pasta do frontend
target$ cd front

# Instale as dependências
target/front$ npm install

# Inicie o servidor de desenvolvimento
target/front$ npm run dev
```

O site ficará disponível em `http://localhost:5173/` por padrão.

---

## Como Executar o Projeto Completo

1. Certifique-se de ter Node.js e npm instalados.
2. Copie e configure o arquivo `.env` em `back/`.
3. Na pasta `back`, execute `npm install` e depois `npx ts-node seed-admin.ts`.
4. Ainda em `back`, inicie a API com `npm run start` (ou o comando definido no `package.json`).
5. Em outra janela de terminal, na pasta `front`, execute `npm install` e depois `npm run dev`.

Pronto! Backend (geralmente em `http://localhost:3000/`) e frontend (`http://localhost:5173/`) estarão rodando simultaneamente.

---

Qualquer dúvida ou sugestão, fique à vontade para abrir uma issue ou entrar em contato.
