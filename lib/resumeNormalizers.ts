import type { UsResume } from "./schemas";

/**
 * Normalizes date format to "Mon YYYY" (e.g., "Jan 2022", "Present")
 */
function normalizeDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  
  const trimmed = dateStr.trim();
  
  // Already in correct format
  if (/^[A-Z][a-z]{2} \d{4}$/.test(trimmed) || trimmed === "Present") {
    return trimmed;
  }
  
  // Try to parse common formats
  const months: Record<string, string> = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
    "1": "Jan", "2": "Feb", "3": "Mar", "4": "Apr",
    "5": "May", "6": "Jun", "7": "Jul", "8": "Aug",
    "9": "Sep"
  };
  
  // Format: YYYY-MM or MM/YYYY or MM-YYYY
  const dateMatch = trimmed.match(/(\d{1,2})[\/\-](\d{4})/);
  if (dateMatch) {
    const month = months[dateMatch[1]] || "Jan";
    return `${month} ${dateMatch[2]}`;
  }
  
  // Format: YYYY-MM-DD
  const isoMatch = trimmed.match(/(\d{4})-(\d{2})/);
  if (isoMatch) {
    const month = months[isoMatch[2]] || "Jan";
    return `${month} ${isoMatch[1]}`;
  }
  
  // If it contains "present" or "atual", return "Present"
  if (/present|atual|current/i.test(trimmed)) {
    return "Present";
  }
  
  // Return as-is if we can't parse
  return trimmed;
}

/**
 * Normalizes resume data: trims whitespace, removes empty bullets, de-dupes skills, normalizes dates
 */
export function normalizeResume(resume: UsResume): UsResume {
  return {
    ...resume,
    contact: {
      ...resume.contact,
      fullName: resume.contact.fullName.trim(),
      location: resume.contact.location.trim(),
      phone: resume.contact.phone?.trim() || undefined,
      email: resume.contact.email?.trim() || undefined,
      linkedin: resume.contact.linkedin?.trim() || undefined,
      portfolio: resume.contact.portfolio?.trim() || undefined,
      headline: resume.contact.headline?.trim() || undefined,
    },
    summary: resume.summary.trim(),
    skills: resume.skills
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .filter((s, idx, arr) => arr.indexOf(s) === idx), // De-dupe
    experience: resume.experience.map(exp => ({
      ...exp,
      company: exp.company.trim(),
      location: exp.location.trim(),
      title: exp.title.trim(),
      startDate: normalizeDate(exp.startDate),
      endDate: normalizeDate(exp.endDate),
      bullets: exp.bullets
        .map(b => b.trim())
        .filter(b => b.length > 0)
    })),
    education: resume.education.map(edu => ({
      ...edu,
      school: edu.school.trim(),
      location: edu.location.trim(),
      degree: edu.degree.trim(),
      field: edu.field?.trim() || undefined,
      endDate: edu.endDate ? normalizeDate(edu.endDate) : undefined,
    })),
    certifications: resume.certifications
      ?.map(c => c.trim())
      .filter(c => c.length > 0) || [],
    projects: resume.projects?.map(proj => ({
      ...proj,
      name: proj.name.trim(),
      description: proj.description?.trim() || undefined,
      technologies: proj.technologies?.map(t => t.trim()).filter(t => t.length > 0) || [],
    })) || [],
    languages: resume.languages?.map(l => l.trim()).filter(l => l.length > 0) || [],
    additional: resume.additional?.trim() || undefined,
  };
}

/**
 * Compacts resume to fit one page using heuristics
 * - Caps summary length (350-450 chars)
 * - Caps bullets per job (3-4 default, 5 max for most recent)
 * - Caps skills to 14-18 items
 * - Optionally drops Projects/Additional if experience is heavy
 */
export function compactResumeToOnePageHeuristics(resume: UsResume): UsResume {
  const compacted = { ...resume };
  
  // 1. Cap summary to 400 chars (target 350-450)
  if (compacted.summary.length > 450) {
    compacted.summary = compacted.summary.substring(0, 400).trim();
    // Try to end at a sentence
    const lastPeriod = compacted.summary.lastIndexOf(".");
    if (lastPeriod > 300) {
      compacted.summary = compacted.summary.substring(0, lastPeriod + 1);
    }
  }
  
  // 2. Cap skills to 16 items (target 14-18)
  if (compacted.skills.length > 18) {
    compacted.skills = compacted.skills.slice(0, 16);
  }
  
  // 3. Cap bullets per job
  const experienceCount = compacted.experience.length;
  compacted.experience = compacted.experience.map((exp, idx) => {
    const isMostRecent = idx === 0;
    const maxBullets = isMostRecent ? 5 : 4;
    const defaultBullets = isMostRecent ? 4 : 3;
    
    // If we have many jobs, be more aggressive
    if (experienceCount > 3 && !isMostRecent) {
      return {
        ...exp,
        bullets: exp.bullets.slice(0, 3)
      };
    }
    
    return {
      ...exp,
      bullets: exp.bullets.slice(0, maxBullets)
    };
  });
  
  // 4. If we have heavy experience section, drop optional sections
  const totalBullets = compacted.experience.reduce((sum, exp) => sum + exp.bullets.length, 0);
  const hasHeavyExperience = totalBullets > 12 || experienceCount > 4;
  
  if (hasHeavyExperience) {
    // Drop projects if we have heavy experience
    if (compacted.projects && compacted.projects.length > 0) {
      compacted.projects = [];
    }
    
    // Drop additional info if we have heavy experience
    if (compacted.additional) {
      compacted.additional = undefined;
    }
    
    // Limit certifications to top 3
    if (compacted.certifications && compacted.certifications.length > 3) {
      compacted.certifications = compacted.certifications.slice(0, 3);
    }
  }
  
  return compacted;
}
