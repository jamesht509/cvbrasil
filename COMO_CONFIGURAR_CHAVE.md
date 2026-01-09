# 🔑 Como Configurar a Chave da API OpenAI Localmente

## Problema
A chave está configurada no Vercel (produção), mas não está disponível no ambiente local de desenvolvimento.

## Solução Rápida

### 1. Copiar a Chave do Vercel

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto **ResumeUSA**
3. Vá em **Settings** → **Environment Variables**
4. Encontre a variável `OPENAI_API_KEY`
5. Clique no ícone de **olho** para revelar o valor
6. **Copie** a chave (começa com `sk-...`)

### 2. Adicionar no Arquivo Local

1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua `sk-sua-chave-aqui` pela chave que você copiou:

```env
OPENAI_API_KEY=sk-sua-chave-real-aqui
```

3. **Salve** o arquivo

### 3. Reiniciar o Servidor

```bash
# Pare o servidor (Ctrl+C) e inicie novamente:
npm run dev
```

## Verificação

Após reiniciar, o servidor deve funcionar sem o erro de chave não configurada.

## Alternativa: Obter Nova Chave

Se preferir criar uma nova chave:

1. Acesse https://platform.openai.com/api-keys
2. Faça login na sua conta OpenAI
3. Clique em **"Create new secret key"**
4. Copie a chave gerada
5. Adicione no arquivo `.env.local`

## Segurança

⚠️ **IMPORTANTE:**
- O arquivo `.env.local` está no `.gitignore` e **NÃO será commitado**
- **NUNCA** compartilhe sua chave da API publicamente
- **NUNCA** faça commit do arquivo `.env.local` no Git

## Troubleshooting

### Erro persiste após adicionar a chave?

1. Verifique se o arquivo está na raiz do projeto: `/Users/Ryan/RESUMEE/.env.local`
2. Verifique se não há espaços extras: `OPENAI_API_KEY=sk-...` (sem espaços)
3. Reinicie o servidor completamente (pare e inicie novamente)
4. Verifique se a chave está válida no Vercel

### Como verificar se a chave está sendo lida?

Adicione um log temporário em `lib/openai.ts`:

```typescript
console.log("API Key configurada:", process.env.OPENAI_API_KEY ? "SIM" : "NÃO");
```

---

**Pronto!** Após seguir esses passos, o app deve funcionar localmente. 🚀
