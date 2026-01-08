"use client";

import type { UsResume } from "../lib/schemas";

interface ResumePreviewProps {
  resume: UsResume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="space-y-2 border-b pb-4">
        <h2 className="text-xl font-bold">{resume.contact.fullName}</h2>
        {resume.contact.headline && (
          <p className="text-muted-foreground">{resume.contact.headline}</p>
        )}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {resume.contact.location && <span>{resume.contact.location}</span>}
          {resume.contact.phone && <span>{resume.contact.phone}</span>}
          {resume.contact.email && <span>{resume.contact.email}</span>}
          {resume.contact.linkedin && (
            <a
              href={resume.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {resume.contact.portfolio && (
            <a
              href={resume.contact.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.summary && (
        <div className="space-y-2">
          <h3 className="font-semibold uppercase text-xs tracking-wide">
            Professional Summary
          </h3>
          <p className="text-muted-foreground leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold uppercase text-xs tracking-wide">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-muted rounded text-xs"
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
          <h3 className="font-semibold uppercase text-xs tracking-wide">
            Professional Experience
          </h3>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{exp.title}</p>
                  <p className="text-muted-foreground text-xs">{exp.company}</p>
                  <p className="text-muted-foreground text-xs">{exp.location}</p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-2">
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
          <h3 className="font-semibold uppercase text-xs tracking-wide">Education</h3>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-muted-foreground text-xs">
                    {edu.degree}
                    {edu.field && `, ${edu.field}`}
                  </p>
                  <p className="text-muted-foreground text-xs">{edu.location}</p>
                </div>
                {edu.endDate && (
                  <p className="text-xs text-muted-foreground">{edu.endDate}</p>
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

