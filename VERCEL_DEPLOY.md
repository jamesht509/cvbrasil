# Deploy no Vercel

Este guia explica como fazer o deploy da aplicação no Vercel e configurar a variável de ambiente da OpenAI.

## Pré-requisitos

- Conta no Vercel (gratuita): https://vercel.com
- Conta na OpenAI com chave de API: https://platform.openai.com/api-keys
- Repositório Git (GitHub, GitLab ou Bitbucket) com o código

## Passo a Passo

### 1. Fazer Push do Código para o Repositório

Certifique-se de que todo o código está commitado e enviado para o repositório remoto:

```bash
git add .
git commit -m "Preparar para deploy"
git push origin main
```

### 2. Conectar o Projeto no Vercel

1. Acesse https://vercel.com e faça login
2. Clique em "Add New..." → "Project"
3. Importe o repositório do GitHub/GitLab/Bitbucket
4. O Vercel detectará automaticamente que é um projeto Next.js

### 3. Configurar Variáveis de Ambiente

**IMPORTANTE:** Antes de fazer o deploy, configure a variável de ambiente:

1. Na página de configuração do projeto no Vercel, vá em **"Environment Variables"**
2. Adicione a seguinte variável:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Sua chave da API OpenAI (começa com `sk-...`)
   - **Environments:** Selecione todas (Production, Preview, Development)

3. Clique em "Save"

### 4. Configurações de Build (Opcional)

O Vercel geralmente detecta automaticamente as configurações do Next.js, mas você pode verificar:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (padrão)
- **Output Directory:** `.next` (padrão)
- **Install Command:** `npm install` (padrão)

### 5. Fazer o Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (geralmente 2-3 minutos)
3. Quando concluído, você receberá uma URL (ex: `seu-projeto.vercel.app`)

### 6. Testar a Aplicação

1. Acesse a URL fornecida pelo Vercel
2. Teste fazendo upload de um PDF de currículo brasileiro
3. Verifique se a conversão funciona corretamente

## Atualizações Futuras

Toda vez que você fizer push para a branch `main` (ou a branch configurada), o Vercel fará um novo deploy automaticamente.

## Troubleshooting

### Erro: "OPENAI_API_KEY environment variable is not set"

- Verifique se a variável de ambiente foi adicionada corretamente no Vercel
- Certifique-se de que selecionou todos os ambientes (Production, Preview, Development)
- Após adicionar a variável, faça um novo deploy

### Erro no Build

- Verifique os logs de build no Vercel
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se não há erros de TypeScript ou lint

### Aplicação não funciona após o deploy

- Verifique os logs de runtime no Vercel
- Teste a API da OpenAI diretamente para garantir que a chave está válida
- Verifique se há limites de uso na sua conta OpenAI

## Variáveis de Ambiente no Vercel

Você pode gerenciar variáveis de ambiente em:
- **Dashboard do Vercel** → Seu Projeto → Settings → Environment Variables

Ou via CLI do Vercel:
```bash
vercel env add OPENAI_API_KEY
```

## Recursos Adicionais

- [Documentação do Vercel](https://vercel.com/docs)
- [Next.js no Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables no Vercel](https://vercel.com/docs/projects/environment-variables)

