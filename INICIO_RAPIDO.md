# 🚀 Início Rápido - ResumeUSA

## Como Executar o Projeto

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Executar em Desenvolvimento
```bash
npm run dev
```

### 3️⃣ Abrir no Navegador
```
http://localhost:3000
```

---

## 📱 Páginas Disponíveis

### 🏠 Página Inicial
**URL:** `http://localhost:3000/`

**O que você verá:**
- Hero section com título destacado
- Badge "Conversão com IA"
- Card de upload de PDF
- Grid com 3 features principais
- Seção "Como Funciona" com 3 passos

**Como testar:**
1. Arraste um PDF para a área de upload OU
2. Clique em "Selecionar arquivo"
3. Escolha um PDF do seu computador
4. Clique em "Gerar Resume Americano"

---

### 👁️ Página de Preview
**URL:** `http://localhost:3000/preview`

**O que você verá:**
- Header de sucesso com ícone
- Preview do resume à esquerda
- Editor de campos à direita
- Seção de dicas no final
- Botões "Voltar" e "Baixar PDF"

**Como testar:**
1. Após fazer upload na página inicial
2. Edite os campos no painel direito
3. Veja as mudanças no preview à esquerda
4. Clique em "Baixar PDF" para exportar

---

### ⚠️ Página de Erro
**URL:** `http://localhost:3000/error`

**O que você verá:**
- Ícone animado de erro
- Mensagem explicativa
- Código do erro
- Botões de ação

**Como testar:**
1. Acesse diretamente `/error`
2. Ou simule um erro na conversão

---

## 🎨 Componentes Principais

### Header (Topo)
- Logo ResumeUSA
- Navegação (Início, Meus Currículos, Preços)
- Ícones de notificação e perfil

### Footer (Rodapé)
- Links (Termos, Privacidade, Ajuda)
- Copyright

### Upload Card
- Drag & drop de arquivos
- Validação de tipo (PDF) e tamanho (10MB)
- Feedback visual

---

## 🎯 Fluxo de Uso

```
1. Usuário acessa página inicial (/)
   ↓
2. Faz upload de um PDF
   ↓
3. Sistema converte (API /api/convert)
   ↓
4. Redireciona para preview (/preview)
   ↓
5. Usuário edita se necessário
   ↓
6. Baixa o PDF final (API /api/pdf)
```

---

## 🔧 Estrutura de Pastas

```
/app
  ├── layout.tsx          # Layout principal (Header + Footer)
  ├── page.tsx            # Página inicial
  ├── globals.css         # Estilos globais
  ├── providers.tsx       # Context providers
  ├── preview/
  │   └── page.tsx        # Página de preview
  └── error/
      └── page.tsx        # Página de erro

/components
  ├── Header.tsx          # Cabeçalho
  ├── Footer.tsx          # Rodapé
  ├── UploadCard.tsx      # Card de upload
  ├── ResumeEditor.tsx    # Editor de campos
  ├── ResumePreview.tsx   # Preview do resume
  └── ui/                 # Componentes base
      ├── button.tsx
      ├── card.tsx
      ├── input.tsx
      ├── textarea.tsx
      └── alert.tsx
```

---

## 🎨 Personalização

### Alterar Cor Primária
**Arquivo:** `tailwind.config.ts`
```typescript
colors: {
  primary: "#135bec", // Altere aqui
}
```

### Alterar Fonte
**Arquivo:** `app/globals.css`
```css
@import url('https://fonts.googleapis.com/css2?family=SuaFonte:wght@400;500;600;700&display=swap');
```

**Arquivo:** `tailwind.config.ts`
```typescript
fontFamily: {
  display: ["SuaFonte", "system-ui", "sans-serif"]
}
```

---

## 🐛 Solução de Problemas

### Erro: "Module not found"
```bash
# Reinstale as dependências
rm -rf node_modules
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Use outra porta
npm run dev -- -p 3001
```

### Estilos não aparecem
```bash
# Limpe o cache do Next.js
rm -rf .next
npm run dev
```

### Ícones não aparecem
Verifique se o link do Google Fonts está no `layout.tsx`:
```tsx
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
  rel="stylesheet"
/>
```

---

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` com:
```env
# OpenAI (para conversão)
OPENAI_API_KEY=sua_chave_aqui

# Supabase (opcional, para salvar resumes)
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

---

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

### Outras Plataformas
O projeto é compatível com:
- Netlify
- Railway
- Render
- AWS Amplify

---

## 📚 Recursos Úteis

### Documentação
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Material Symbols](https://fonts.google.com/icons)

### Arquivos de Ajuda
- `DESIGN_UPDATE.md` - Detalhes das mudanças
- `VISUAL_GUIDE.md` - Guia visual completo
- `RESUMO_ATUALIZACAO.md` - Resumo da atualização

---

## ✅ Checklist de Teste

Antes de fazer deploy, teste:

- [ ] Upload de PDF funciona
- [ ] Conversão retorna dados corretos
- [ ] Preview mostra informações
- [ ] Editor permite edição
- [ ] Download de PDF funciona
- [ ] Página de erro aparece quando necessário
- [ ] Design responsivo em mobile
- [ ] Design responsivo em tablet
- [ ] Design responsivo em desktop
- [ ] Todos os ícones aparecem
- [ ] Todas as animações funcionam
- [ ] Links do header/footer funcionam

---

## 🎉 Pronto!

Seu sistema está atualizado e pronto para uso. Aproveite o novo design moderno e profissional!

**Dúvidas?** Consulte os arquivos de documentação ou o código-fonte.

---

*Desenvolvido com ❤️ para ResumeUSA*
