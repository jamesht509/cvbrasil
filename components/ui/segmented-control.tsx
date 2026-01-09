"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
}

export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(({ value, onChange, options, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-1",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-4 py-2 text-sm font-semibold rounded-md transition-all",
            value === option.value
              ? "bg-primary text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
});

SegmentedControl.displayName = "SegmentedControl";
