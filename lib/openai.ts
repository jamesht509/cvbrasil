import OpenAI from "openai";
import { z } from "zod";

// Lazy initialization to avoid build-time errors
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY não configurada!");
    throw new Error("OPENAI_API_KEY environment variable is not set. Please configure your OpenAI API key.");
  }
  return new OpenAI({
    apiKey
  });
}

/**
 * Calls OpenAI API and enforces JSON-only response with Zod validation
 */
export async function callOpenAIJson<T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  systemMessage?: string
): Promise<T> {
  const defaultSystemMessage =
    "You are a helpful assistant that responds ONLY with valid JSON. No markdown code blocks, no commentary, no explanations. Just pure JSON that matches the requested schema.";

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: systemMessage || defaultSystemMessage
    },
    {
      role: "user",
      content: prompt
    }
  ];

  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    try {
      const openai = getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using gpt-4o-mini for cost efficiency, can upgrade to gpt-4o if needed
        messages,
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from OpenAI");
      }

      // Remove markdown code blocks if present
      let jsonText = content.trim();
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      const parsed = JSON.parse(jsonText);
      const validated = schema.parse(parsed);
      return validated;
    } catch (error: any) {
      attempts++;
      console.error(`Tentativa ${attempts} falhou:`, error);
      
      if (attempts >= maxAttempts) {
        console.error("OpenAI JSON parsing failed after retries:", error);
        
        // Mensagem de erro mais detalhada
        let errorMessage = "Failed to get valid JSON response from AI.";
        if (error?.issues) {
          // Erro de validação Zod
          errorMessage = `Erro de validação: ${error.issues.map((i: any) => i.path.join(".") + " - " + i.message).join(", ")}`;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
      }
      
      // Retry with corrective prompt - add error context to messages
      const errorHint = error?.issues 
        ? `Erro de validação: ${error.issues[0]?.path?.join(".")} - ${error.issues[0]?.message}.`
        : "O JSON retornado não é válido.";
        
      messages.push({
        role: "user",
        content: `${errorHint} Por favor, responda novamente com APENAS JSON válido, sem markdown, sem blocos de código, sem comentários.`
      });
    }
  }

  throw new Error("Unexpected error in OpenAI call");
}

/**
 * Step A: Extract structured data from Portuguese resume text
 */
export async function extractBrazilianResumeData(
  rawText: string
): Promise<z.infer<typeof import("./schemas").BrazilResumeExtractedSchema>> {
  const { BrazilResumeExtractedSchema } = await import("./schemas");

  // Clean and normalize text
  const cleanedText = rawText
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/\n{3,}/g, "\n\n") // Normalize multiple newlines
    .trim();

  if (cleanedText.length < 200) {
    throw new Error("Texto muito curto para processar. O PDF precisa conter mais conteúdo.");
  }

  const prompt = `Extract structured resume data from the following Portuguese resume text. 
Be robust to messy formatting, missing sections, and various layouts.
If a field is not found, use empty string or empty array as appropriate.
Do your best to extract all available information.

Return a JSON object with this structure:
{
  "dadosPessoais": {
    "nome": "Full name (required)",
    "cidade": "City",
    "estado": "State (e.g., SP, RJ)",
    "telefone": "Phone number",
    "email": "Email",
    "linkedin": "LinkedIn URL if present",
    "portfolio": "Portfolio URL if present",
    "outrosDadosBrutos": "Any other personal info found"
  },
  "resumoProfissional": "Professional summary text (can be empty if not found)",
  "competencias": ["skill1", "skill2", ...] (can be empty array),
  "experiencias": [
    {
      "empresa": "Company name",
      "cargo": "Job title",
      "cidade": "City",
      "estado": "State",
      "tipoContrato": "CLT, PJ, MEI, etc. if mentioned",
      "inicio": "Start date (any format found)",
      "fim": "End date or 'Atual' if current",
      "responsabilidades": ["responsibility 1", ...],
      "resultados": ["achievement 1", ...] (optional)
    }
  ] (can be empty array),
  "formacao": [
    {
      "instituicao": "School/University name",
      "cidade": "City",
      "estado": "State",
      "nivel": "Ensino Médio, Tecnólogo, Graduação, Pós-graduação, etc.",
      "curso": "Course/Field name",
      "conclusao": "Completion date"
    }
  ] (can be empty array),
  "certificacoes": ["certification 1", ...] (can be empty array),
  "projetos": [
    {
      "nome": "Project name",
      "descricao": "Description",
      "tecnologias": ["tech1", ...]
    }
  ] (optional, can be empty array),
  "idiomas": ["Language: Level", ...] (optional, can be empty array),
  "informacoesAdicionais": "Any other relevant info" (optional)
}

IMPORTANT: Always return valid JSON. If a section is missing, use empty values (empty string "", empty array [], or empty object {}).
The "nome" field in dadosPessoais is required - try to extract it even if it's not clearly labeled.

Resume text (${cleanedText.length} characters):
${cleanedText.substring(0, 15000)}${cleanedText.length > 15000 ? "\n\n[... truncated ...]" : ""}

Respond ONLY with valid JSON. No markdown code blocks. No commentary. Just pure JSON.`;

  try {
    return await callOpenAIJson(prompt, BrazilResumeExtractedSchema);
  } catch (error: any) {
    console.error("Error in extractBrazilianResumeData:", error);
    
    // Se for erro de validação do schema, tentar novamente com prompt mais simples
    if (error?.message?.includes("schema") || error?.message?.includes("validation")) {
      console.log("Tentando novamente com prompt simplificado...");
      const simplifiedPrompt = `Extract the most important information from this Portuguese resume text.

Return JSON with at minimum:
{
  "dadosPessoais": {
    "nome": "Name found in the text"
  },
  "experiencias": [],
  "formacao": [],
  "competencias": [],
  "resumoProfissional": ""
}

Text: ${cleanedText.substring(0, 8000)}

Return ONLY valid JSON, no markdown.`;
      
      try {
        return await callOpenAIJson(simplifiedPrompt, BrazilResumeExtractedSchema);
      } catch (retryError) {
        throw new Error(`Failed to extract resume data: ${error.message}. Original error: ${retryError}`);
      }
    }
    
    throw error;
  }
}

/**
 * Step B: Convert Brazilian resume JSON to US-style resume JSON in English
 */
export async function convertToUsResume(
  brazilianData: z.infer<typeof import("./schemas").BrazilResumeExtractedSchema>
): Promise<z.infer<typeof import("./schemas").UsResumeSchema>> {
  const { UsResumeSchema } = await import("./schemas");

  const prompt = `Convert the following Brazilian resume data to a US-style resume in formal business English.

IMPORTANT RULES:
1. Remove Brazilian-only information: CPF, RG, photo, age, marital status (unless absolutely necessary)
2. Translate education terms:
   - "Ensino Médio" → "High School Diploma"
   - "Tecnólogo" → "Associate Degree" or "Technology Degree"
   - "Graduação" → "Bachelor's Degree"
   - "Pós-graduação" → "Graduate Degree" or "Master's Degree"
   - "Doutorado" → "Ph.D."
3. Convert employment types:
   - "MEI" or "PJ" → "Independent Contractor" or "Self-Employed"
   - "CLT" → "Full-time Employee" (or omit if not relevant)
4. Use formal US business English with action verbs
5. Quantify achievements when possible (numbers, percentages, etc.)
6. Format dates as "Jan 2022" or "Present"
7. Use US-style location format: "City, State" (e.g., "São Paulo, SP" → "São Paulo, SP" or translate state if known)

Return JSON with this exact structure:
{
  "contact": {
    "fullName": "Full name in English",
    "headline": "Professional headline (optional)",
    "location": "City, State",
    "phone": "Phone number",
    "email": "Email",
    "linkedin": "LinkedIn URL if available",
    "portfolio": "Portfolio URL if available"
  },
  "summary": "Professional summary in formal business English, 2-4 sentences",
  "skills": ["skill1", "skill2", ...],
  "experience": [
    {
      "company": "Company name",
      "location": "City, State",
      "title": "Job title in English",
      "startDate": "Jan 2022",
      "endDate": "Present" or "Jan 2024",
      "bullets": [
        "Action verb bullet point with quantified achievements",
        "Another achievement or responsibility",
        ...
      ]
    }
  ],
  "education": [
    {
      "school": "School/University name",
      "location": "City, State",
      "degree": "Degree name in English (e.g., Bachelor's Degree, High School Diploma)",
      "field": "Field of study if applicable",
      "endDate": "Jan 2024" (optional)
    }
  ],
  "certifications": ["Certification name in English", ...] (optional),
  "projects": [
    {
      "name": "Project name",
      "description": "Brief description",
      "technologies": ["tech1", ...]
    }
  ] (optional),
  "languages": ["Language: Proficiency level", ...] (optional),
  "additional": "Any additional relevant information" (optional)
}

Brazilian resume data:
${JSON.stringify(brazilianData, null, 2)}

Respond ONLY with valid JSON. No markdown. No commentary.`;

  return callOpenAIJson(prompt, UsResumeSchema);
}

