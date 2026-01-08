"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export function Alert({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }) {
  const base =
    "relative w-full rounded-md border px-4 py-3 text-sm flex gap-2 items-start";
  const variants: Record<string, string> = {
    default: "bg-muted text-foreground border-border",
    destructive:
      "border-destructive/70 text-destructive-foreground bg-destructive/10"
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
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}


