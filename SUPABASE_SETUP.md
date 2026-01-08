# Configuração do Supabase

Este guia explica como configurar o Supabase para armazenar os resumes gerados.

## Pré-requisitos

- Conta no Supabase (gratuita): https://supabase.com
- Projeto criado no Supabase

## Passo 1: Criar Tabela no Supabase

1. Acesse o dashboard do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Execute o seguinte SQL para criar a tabela `resumes`:

```sql
-- Criar tabela de resumes
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  original_filename TEXT,
  resume_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para busca por usuário
CREATE INDEX IF NOT EXISTS resumes_user_id_idx ON public.resumes(user_id);

-- Criar índice para busca por data de criação
CREATE INDEX IF NOT EXISTS resumes_created_at_idx ON public.resumes(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Política: usuários podem ver apenas seus próprios resumes
CREATE POLICY "Users can view their own resumes"
  ON public.resumes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: usuários podem inserir seus próprios resumes
CREATE POLICY "Users can insert their own resumes"
  ON public.resumes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: usuários podem atualizar seus próprios resumes
CREATE POLICY "Users can update their own resumes"
  ON public.resumes
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: usuários podem deletar seus próprios resumes
CREATE POLICY "Users can delete their own resumes"
  ON public.resumes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Se você quiser permitir acesso sem autenticação (para testes)
-- Descomente a linha abaixo (NÃO recomendado para produção):
-- CREATE POLICY "Allow public read access" ON public.resumes FOR SELECT USING (true);
```

## Passo 2: Obter Credenciais do Supabase

1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie as seguintes informações:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon/public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **service_role key** (SUPABASE_SERVICE_ROLE_KEY) - **Mantenha esta chave secreta!**

## Passo 3: Configurar Variáveis de Ambiente

### Para desenvolvimento local (.env):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

### Para Vercel:

1. No dashboard do Vercel, vá em **Settings** → **Environment Variables**
2. Adicione as três variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Selecione todos os ambientes (Production, Preview, Development)
4. Clique em **Save**

## Passo 4: Atualizar .env.example

O arquivo `.env.example` já foi atualizado com as variáveis do Supabase.

## Estrutura da Tabela

A tabela `resumes` armazena:
- `id`: UUID único do resume
- `user_id`: ID do usuário (opcional, para autenticação futura)
- `original_filename`: Nome do arquivo PDF original
- `resume_data`: JSON completo do resume (formato UsResume)
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

## Uso no Código

### Salvar um resume:

```typescript
import { saveResume } from "@/lib/db-resumes";

const saved = await saveResume(resumeData, userId, "curriculo.pdf");
```

### Buscar resumes de um usuário:

```typescript
import { getUserResumes } from "@/lib/db-resumes";

const resumes = await getUserResumes(userId);
```

### Buscar um resume por ID:

```typescript
import { getResumeById } from "@/lib/db-resumes";

const resume = await getResumeById(resumeId);
```

## Segurança

- **Row Level Security (RLS)** está habilitado por padrão
- Usuários só podem acessar seus próprios resumes
- A `service_role_key` deve ser usada apenas no servidor (API routes)
- Nunca exponha a `service_role_key` no cliente

## Próximos Passos

1. Integrar autenticação de usuários (opcional)
2. Criar página de histórico de resumes
3. Adicionar funcionalidade de editar resumes salvos
4. Implementar compartilhamento de resumes (opcional)

## Troubleshooting

### Erro: "Missing Supabase environment variables"

- Verifique se todas as variáveis de ambiente estão configuradas
- Reinicie o servidor de desenvolvimento após adicionar variáveis

### Erro: "Failed to save resume to database"

- Verifique se a tabela foi criada corretamente
- Verifique se as políticas RLS estão configuradas
- Verifique os logs do Supabase para mais detalhes

### Erro de permissão

- Verifique se o RLS está configurado corretamente
- Se estiver testando sem autenticação, ajuste as políticas conforme necessário

