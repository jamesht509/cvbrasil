import { z } from "zod";

// Schema for extracted Brazilian resume data (Portuguese)
export const BrazilResumeExtractedSchema = z.object({
  dadosPessoais: z.object({
    nome: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
    outrosDadosBrutos: z.string().optional()
  }),
  resumoProfissional: z.string().default(""),
  competencias: z.array(z.string()).default([]),
  experiencias: z
    .array(
      z.object({
        empresa: z.string().default(""),
        cargo: z.string().default(""),
        cidade: z.string().optional(),
        estado: z.string().optional(),
        tipoContrato: z.string().optional(), // CLT, PJ, MEI, etc.
        inicio: z.string().optional(),
        fim: z.string().optional(),
        responsabilidades: z.array(z.string()).default([]),
        resultados: z.array(z.string()).default([])
      })
    )
    .default([]),
  formacao: z
    .array(
      z.object({
        instituicao: z.string().default(""),
        cidade: z.string().optional(),
        estado: z.string().optional(),
        nivel: z.string().optional(), // Ensino Médio, Tecnólogo, Graduação, Pós, etc.
        curso: z.string().optional(),
        conclusao: z.string().optional()
      })
    )
    .default([]),
  certificacoes: z.array(z.string()).default([]),
  projetos: z
    .array(
      z.object({
        nome: z.string().default(""),
        descricao: z.string().default(""),
        tecnologias: z.array(z.string()).default([])
      })
    )
    .default([]),
  idiomas: z.array(z.string()).default([]),
  informacoesAdicionais: z.string().default("")
});

export type BrazilResumeExtracted = z.infer<typeof BrazilResumeExtractedSchema>;

// Schema for final US resume (English)
export const UsResumeSchema = z.object({
  contact: z.object({
    fullName: z.string(),
    headline: z.string().optional(),
    location: z.string(), // "City, State" format
    phone: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional()
  }),
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      company: z.string(),
      location: z.string(),
      title: z.string(),
      startDate: z.string(), // "Jan 2022" format
      endDate: z.string(), // "Present" or "Jan 2024"
      bullets: z.array(z.string())
    })
  ),
  education: z.array(
    z.object({
      school: z.string(),
      location: z.string(),
      degree: z.string(),
      field: z.string().optional(),
      endDate: z.string().optional()
    })
  ),
  certifications: z.array(z.string()).optional(),
  projects: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        technologies: z.array(z.string()).optional()
      })
    )
    .optional(),
  languages: z.array(z.string()).optional(),
  additional: z.string().optional(),
  // Metadata (UI-only, not included in PDF)
  metadata: z.object({
    importSources: z.object({
      usedLinkedinPdf: z.boolean(),
      usedLinkedinAbout: z.boolean(),
      linkedinUrlProvided: z.boolean()
    }),
    conflictsDetected: z.array(z.string()).optional()
  }).optional()
});

export type UsResume = z.infer<typeof UsResumeSchema>;

