"use client";

import type { UsResume } from "../lib/schemas";

interface ResumePreviewProps {
  resume: UsResume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="space-y-3 border-b-2 border-primary pb-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {resume.contact.fullName}
        </h2>
        {resume.contact.headline && (
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            {resume.contact.headline}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
          {resume.contact.location && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {resume.contact.location}
            </span>
          )}
          {resume.contact.phone && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">phone</span>
              {resume.contact.phone}
            </span>
          )}
          {resume.contact.email && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">email</span>
              {resume.contact.email}
            </span>
          )}
          {resume.contact.linkedin && (
            <a
              href={resume.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-sm">link</span>
              LinkedIn
            </a>
          )}
          {resume.contact.portfolio && (
            <a
              href={resume.contact.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-sm">language</span>
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.summary && (
        <div className="space-y-2">
          <h3 className="font-bold uppercase text-sm tracking-wide text-primary border-b border-slate-200 dark:border-slate-700 pb-1">
            Professional Summary
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-bold uppercase text-sm tracking-wide text-primary border-b border-slate-200 dark:border-slate-700 pb-1">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold uppercase text-sm tracking-wide text-primary border-b border-slate-200 dark:border-slate-700 pb-1">
            Professional Experience
          </h3>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white">{exp.title}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">{exp.company}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{exp.location}</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 ml-2">
                {exp.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold uppercase text-sm tracking-wide text-primary border-b border-slate-200 dark:border-slate-700 pb-1">
            Education
          </h3>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white">{edu.school}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {edu.degree}
                    {edu.field && `, ${edu.field}`}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{edu.location}</p>
                </div>
                {edu.endDate && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{edu.endDate}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold uppercase text-xs tracking-wide">
            Certifications
          </h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-2">
            {resume.certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold uppercase text-xs tracking-wide">Projects</h3>
          {resume.projects.map((project, idx) => (
            <div key={idx} className="space-y-1">
              <p className="font-semibold">{project.name}</p>
              {project.description && (
                <p className="text-xs text-muted-foreground">{project.description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-xs text-muted-foreground italic">
                  {project.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {resume.languages && resume.languages.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold uppercase text-xs tracking-wide">Languages</h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-2">
            {resume.languages.map((lang, idx) => (
              <li key={idx}>{lang}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Information */}
      {resume.additional && (
        <div className="space-y-2">
          <h3 className="font-semibold uppercase text-xs tracking-wide">
            Additional Information
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs">
            {resume.additional}
          </p>
        </div>
      )}
    </div>
  );
}

