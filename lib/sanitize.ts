/**
 * Sanitizes a file name to prevent path traversal and other security issues
 */
export function sanitizeFileName(original: string): string {
  // Remove path separators and dangerous characters
  let sanitized = original
    .replace(/[\/\\]/g, "_")
    .replace(/[<>:"|?*]/g, "")
    .trim();

  // Limit length
  if (sanitized.length > 255) {
    const ext = sanitized.substring(sanitized.lastIndexOf("."));
    sanitized = sanitized.substring(0, 255 - ext.length) + ext;
  }

  // Ensure it ends with .pdf if it's meant to be a PDF
  if (!sanitized.toLowerCase().endsWith(".pdf")) {
    sanitized += ".pdf";
  }

  return sanitized || "resume.pdf";
}

/**
 * Safely stringifies JSON for logging, truncating long strings
 */
export function safeJsonStringify(obj: unknown, maxLength = 500): string {
  try {
    const str = JSON.stringify(obj, null, 2);
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "... [truncated]";
    }
    return str;
  } catch {
    return "[Unable to stringify]";
  }
}

