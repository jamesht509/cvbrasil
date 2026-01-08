# Converter Currículo (BR) para Resume (EUA)

Aplicação web que converte currículos brasileiros em PDF (português) para resumes em inglês no padrão americano, otimizados para ATS (Applicant Tracking Systems).

## Descrição

Esta aplicação permite que usuários façam upload de um currículo brasileiro em PDF e recebam automaticamente um resume em inglês, formatado no padrão americano, pronto para ser usado em processos seletivos nos Estados Unidos.

### Funcionalidades

- Upload de PDF com texto selecionável
- Extração automática de informações do currículo
- Conversão para formato americano com tradução para inglês formal
- Pré-visualização do resume gerado
- Edição de campos antes do download
- Geração de PDF otimizado para ATS

## Requisitos

- Node.js 18+ 
- npm ou yarn
- Chave de API da OpenAI

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/jamesht509/cvbrasil.git
cd cvbrasil
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da OpenAI:
```
OPENAI_API_KEY=sua_chave_aqui
```

## Como executar

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Abra o navegador em:
```
http://localhost:3000
```

3. Faça upload de um currículo brasileiro em PDF e aguarde a conversão.

## Limitações

- **PDFs escaneados**: A aplicação requer PDFs com texto selecionável. PDFs escaneados (imagens) não funcionarão, pois não é possível extrair texto deles.
- **Qualidade do texto**: A qualidade da conversão depende da qualidade e organização do texto original no PDF.
- **Dependência da API OpenAI**: A aplicação requer uma chave válida da OpenAI para funcionar. Erros na API podem afetar a conversão.

## Nota de Privacidade

- Os dados do currículo são processados apenas em memória durante a requisição.
- Nenhum arquivo ou dado é armazenado permanentemente no servidor.
- Os dados são enviados para a API da OpenAI para processamento, conforme os termos de uso da OpenAI.

## Tecnologias Utilizadas

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- React-PDF (@react-pdf/renderer)
- OpenAI API
- Zod (validação de schemas)
- pdf-parse (extração de texto)

## Estrutura do Projeto

```
/app
  /api
    /convert    # Rota para conversão do PDF
    /pdf        # Rota para geração do PDF final
  /preview      # Página de pré-visualização
  page.tsx      # Página inicial
/components
  UploadCard.tsx
  ResumePreview.tsx
  ResumeEditor.tsx
/lib
  schemas.ts           # Schemas Zod
  openai.ts            # Integração com OpenAI
  extractTextFromPdf.ts
  pdfTemplate.tsx      # Template do PDF
  sanitize.ts
  resumeFormatters.ts
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Licença

Este projeto é privado.

