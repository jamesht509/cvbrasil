import { createServerClient } from "./server";
import { createClient } from "./client";

// Storage bucket names
export const BUCKETS = {
  UPLOADS: "uploads",
  EXPORTS: "exports",
} as const;

// Client-side upload function
export async function uploadFile(
  file: File,
  bucket: string,
  fileName: string,
  userId: string
): Promise<{ path: string; error?: string }> {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { path: "", error: error.message };
  }

  return { path: data.path };
}

// Server-side upload function (for API routes)
export async function uploadFileServer(
  file: Buffer,
  bucket: string,
  fileName: string,
  userId: string,
  contentType?: string
): Promise<{ path: string; error?: string }> {
  const supabase = createServerClient();

  const fileExt = fileName.split(".").pop();
  const filePath = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      contentType: contentType || "application/octet-stream",
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { path: "", error: error.message };
  }

  return { path: data.path };
}

// Create signed URL for private files
export async function createSignedUrl(
  bucket: string,
  filePath: string,
  expiresIn: number = 3600 // 1 hour
): Promise<{ signedUrl?: string; error?: string }> {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    return { error: error.message };
  }

  return { signedUrl: data.signedUrl };
}

// Server-side signed URL creation
export async function createSignedUrlServer(
  bucket: string,
  filePath: string,
  expiresIn: number = 3600
): Promise<{ signedUrl?: string; error?: string }> {
  const supabase = createServerClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    return { error: error.message };
  }

  return { signedUrl: data.signedUrl };
}

// Delete file
export async function deleteFile(
  bucket: string,
  filePath: string
): Promise<{ error?: string }> {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    return { error: error.message };
  }

  return {};
}

// Server-side delete
export async function deleteFileServer(
  bucket: string,
  filePath: string
): Promise<{ error?: string }> {
  const supabase = createServerClient();

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    return { error: error.message };
  }

  return {};
}

// List user files
export async function listUserFiles(
  bucket: string,
  userId: string
): Promise<{ files?: any[]; error?: string }> {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .list(userId);

  if (error) {
    return { error: error.message };
  }

  return { files: data };
}

// Server-side list
export async function listUserFilesServer(
  bucket: string,
  userId: string
): Promise<{ files?: any[]; error?: string }> {
  const supabase = createServerClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .list(userId);

  if (error) {
    return { error: error.message };
  }

  return { files: data };
}