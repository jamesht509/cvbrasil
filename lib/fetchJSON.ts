/**
 * Typed fetch helper with error handling
 */
export class FetchError extends Error {
  status: number;
  info?: any;

  constructor(message: string, status: number, info?: any) {
    super(message);
    this.status = status;
    this.info = info;
    this.name = "FetchError";
  }
}

export async function fetchJSON<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new FetchError(
      data.error || data.message || "An error occurred",
      response.status,
      data
    );
  }

  return data;
}

/**
 * POST helper
 */
export async function postJSON<T = any>(
  url: string,
  body: any,
  options?: RequestInit
): Promise<T> {
  return fetchJSON<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(body)
  });
}

/**
 * PUT helper
 */
export async function putJSON<T = any>(
  url: string,
  body: any,
  options?: RequestInit
): Promise<T> {
  return fetchJSON<T>(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body)
  });
}

/**
 * DELETE helper
 */
export async function deleteJSON<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  return fetchJSON<T>(url, {
    ...options,
    method: "DELETE"
  });
}
