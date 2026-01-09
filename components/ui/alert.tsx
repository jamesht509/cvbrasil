"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export function Alert({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }) {
  const base =
    "relative w-full rounded-lg border-2 px-4 py-3 text-sm flex gap-3 items-start";
  const variants: Record<string, string> = {
    default: "bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800",
    destructive:
      "border-red-300 dark:border-red-900 text-red-900 dark:text-red-100 bg-red-50 dark:bg-red-900/20"
  };
  return (
    <div className={cn(base, variants[variant], className)} role="alert" {...props} />
  );
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-bold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm mt-1", className)} {...props} />
  );
}


