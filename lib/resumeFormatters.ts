import type { UsResume } from "./schemas";

/**
 * Normalizes and formats resume data for PDF generation
 */
export function formatResumeForPdf(resume: UsResume): UsResume {
  // Limit bullets per experience to keep PDF manageable
  const maxBulletsPerExperience = 6;

  const formatted: UsResume = {
    ...resume,
    experience: resume.experience.map((exp) => ({
      ...exp,
      bullets: exp.bullets.slice(0, maxBulletsPerExperience)
    })),
    skills: resume.skills || [],
    certifications: resume.certifications || [],
    education: resume.education || []
  };

  return formatted;
}

/**
 * Ensures all required fields have default values
 */
export function ensureResumeDefaults(resume: Partial<UsResume>): UsResume {
  return {
    contact: {
      fullName: resume.contact?.fullName || "",
      location: resume.contact?.location || "",
      ...resume.contact
    },
    summary: resume.summary || "",
    skills: resume.skills || [],
    experience: resume.experience || [],
    education: resume.education || [],
    certifications: resume.certifications || [],
    projects: resume.projects,
    languages: resume.languages,
    additional: resume.additional
  };
}

