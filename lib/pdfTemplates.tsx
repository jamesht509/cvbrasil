import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { UsResume } from "./schemas";

// Design Tokens
const TOKENS = {
  page: {
    size: "LETTER",
    margin: 40,
  },
  fonts: {
    base: "Helvetica",
    name: 20,
    sectionTitle: 11,
    body: 10.5,
    small: 9.5,
  },
  spacing: {
    afterHeader: 10,
    betweenSections: 12,
    betweenJobs: 10,
    bulletLine: 2.5,
  },
  colors: {
    black: "#000000",
    gray: "#666666",
    accent: "#4A5568", // Muted blue-gray for premium template
  },
  lineHeight: {
    body: 1.25,
  },
} as const;

// ATS Clean Template Styles
const atsStyles = StyleSheet.create({
  page: {
    fontFamily: TOKENS.fonts.base,
    fontSize: TOKENS.fonts.body,
    padding: TOKENS.page.margin,
    color: TOKENS.colors.black,
  },
  header: {
    marginBottom: TOKENS.spacing.afterHeader,
  },
  name: {
    fontSize: TOKENS.fonts.name,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contact: {
    fontSize: TOKENS.fonts.small,
    color: TOKENS.colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    lineHeight: TOKENS.lineHeight.body,
  },
  contactItem: {
    marginRight: 8,
  },
  section: {
    marginBottom: TOKENS.spacing.betweenSections,
  },
  sectionTitle: {
    fontSize: TOKENS.fonts.sectionTitle,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionTitleContainer: {
    minPresenceAhead: 120, // Prevent orphaned section headers
  },
  summary: {
    fontSize: TOKENS.fonts.body,
    lineHeight: TOKENS.lineHeight.body,
    marginBottom: 0,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skill: {
    fontSize: TOKENS.fonts.body,
    marginRight: 6,
    marginBottom: 2,
  },
  experienceItem: {
    marginBottom: TOKENS.spacing.betweenJobs,
  },
  experienceItemContainer: {
    minPresenceAhead: 180, // Keep job blocks together
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  experienceLeft: {
    flex: 1,
  },
  experienceTitle: {
    fontSize: TOKENS.fonts.body,
    fontWeight: "bold",
    marginBottom: 1,
  },
  experienceCompany: {
    fontSize: TOKENS.fonts.body,
    color: TOKENS.colors.black,
    marginBottom: 1,
  },
  experienceLocation: {
    fontSize: TOKENS.fonts.small,
    color: TOKENS.colors.gray,
  },
  experienceDates: {
    fontSize: TOKENS.fonts.small,
    color: TOKENS.colors.gray,
    textAlign: "right",
  },
  bullet: {
    fontSize: TOKENS.fonts.body,
    marginLeft: 8,
    marginBottom: TOKENS.spacing.bulletLine,
    lineHeight: TOKENS.lineHeight.body,
  },
  bulletText: {
    marginLeft: 4,
  },
  educationItem: {
    marginBottom: 6,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  educationLeft: {
    flex: 1,
  },
  educationSchool: {
    fontSize: TOKENS.fonts.body,
    fontWeight: "bold",
    marginBottom: 1,
  },
  educationDegree: {
    fontSize: TOKENS.fonts.body,
    color: TOKENS.colors.black,
    marginBottom: 1,
  },
  educationLocation: {
    fontSize: TOKENS.fonts.small,
    color: TOKENS.colors.gray,
  },
  educationDate: {
    fontSize: TOKENS.fonts.small,
    color: TOKENS.colors.gray,
    textAlign: "right",
  },
  certification: {
    fontSize: TOKENS.fonts.body,
    marginBottom: 2,
    marginLeft: 8,
    lineHeight: TOKENS.lineHeight.body,
  },
  projectItem: {
    marginBottom: 6,
  },
  projectName: {
    fontSize: TOKENS.fonts.body,
    fontWeight: "bold",
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: TOKENS.fonts.body,
    color: TOKENS.colors.black,
    marginBottom: 2,
    lineHeight: TOKENS.lineHeight.body,
  },
  projectTech: {
    fontSize: TOKENS.fonts.small,
    color: TOKENS.colors.gray,
    fontStyle: "italic",
  },
  language: {
    fontSize: TOKENS.fonts.body,
    marginBottom: 2,
    marginLeft: 8,
    lineHeight: TOKENS.lineHeight.body,
  },
  additional: {
    fontSize: TOKENS.fonts.body,
    lineHeight: TOKENS.lineHeight.body,
  },
});

// Premium Corporate Template Styles
const premiumStyles = StyleSheet.create({
  ...atsStyles,
  accentLine: {
    height: 2,
    backgroundColor: TOKENS.colors.accent,
    marginBottom: 8,
    marginLeft: -TOKENS.page.margin,
    marginRight: -TOKENS.page.margin,
    marginTop: -TOKENS.page.margin,
  },
  sectionTitle: {
    ...atsStyles.sectionTitle,
    letterSpacing: 1,
  },
  sectionTitleUnderline: {
    height: 0.5,
    backgroundColor: TOKENS.colors.accent,
    marginTop: 2,
    marginBottom: 4,
  },
});

interface ResumePdfDocumentProps {
  resume: UsResume;
  style: "ats" | "premium";
}

export function ResumePdfDocument({ resume, style }: ResumePdfDocumentProps) {
  const styles = style === "premium" ? premiumStyles : atsStyles;
  const isPremium = style === "premium";

  const renderContactLine = () => {
    const parts: string[] = [];
    if (resume.contact.location) parts.push(resume.contact.location);
    if (resume.contact.phone) parts.push(resume.contact.phone);
    if (resume.contact.email) parts.push(resume.contact.email);
    if (resume.contact.linkedin) parts.push("LinkedIn");
    if (resume.contact.portfolio) parts.push("Portfolio");
    return parts.join(" | ");
  };

  return (
    <Document>
      <Page size={TOKENS.page.size} style={styles.page}>
        {/* Premium accent line at top */}
        {isPremium && <View style={premiumStyles.accentLine} />}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.contact.fullName}</Text>
          <Text style={styles.contact}>{renderContactLine()}</Text>
        </View>

        {/* Professional Summary */}
        {resume.summary && (
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>SUMMARY</Text>
              {isPremium && <View style={premiumStyles.sectionTitleUnderline} />}
            </View>
            <Text style={styles.summary}>{resume.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>SKILLS</Text>
              {isPremium && <View style={premiumStyles.sectionTitleUnderline} />}
            </View>
            <View style={styles.skillsList}>
              {resume.skills.map((skill, idx) => (
                <Text key={idx} style={styles.skill}>
                  {skill}
                  {idx < resume.skills.length - 1 ? ", " : ""}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Professional Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              {isPremium && <View style={premiumStyles.sectionTitleUnderline} />}
            </View>
            {resume.experience.map((exp, idx) => (
              <View key={idx} style={styles.experienceItemContainer} wrap={false}>
                <View style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.experienceLeft}>
                      <Text style={styles.experienceCompany}>{exp.company}</Text>
                      <Text style={styles.experienceLocation}>{exp.location}</Text>
                    </View>
                    <View>
                      <Text style={styles.experienceTitle}>{exp.title}</Text>
                      <Text style={styles.experienceDates}>
                        {exp.startDate} - {exp.endDate}
                      </Text>
                    </View>
                  </View>
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <View key={bulletIdx} style={styles.bullet}>
                      <Text>
                        • <Text style={styles.bulletText}>{bullet}</Text>
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {isPremium && <View style={premiumStyles.sectionTitleUnderline} />}
            </View>
            {resume.education.map((edu, idx) => (
              <View key={idx} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View style={styles.educationLeft}>
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                    <Text style={styles.educationDegree}>
                      {edu.degree}
                      {edu.field && `, ${edu.field}`}
                    </Text>
                    <Text style={styles.educationLocation}>{edu.location}</Text>
                  </View>
                  {edu.endDate && (
                    <Text style={styles.educationDate}>{edu.endDate}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
              {isPremium && <View style={premiumStyles.sectionTitleUnderline} />}
            </View>
            {resume.certifications.map((cert, idx) => (
              <Text key={idx} style={styles.certification}>
                • {cert}
              </Text>
            ))}
          </View>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>PROJECTS</Text>
              {isPremium && <View style={premiumStyles.sectionTitleUnderline} />}
            </View>
            {resume.projects.map((project, idx) => (
              <View key={idx} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.description && (
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.projectTech}>
                    {project.technologies.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {resume.languages && resume.languages.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>LANGUAGES</Text>
              {isPremium && <View style={premiumStyles.sectionTitleUnderline} />}
            </View>
            {resume.languages.map((lang, idx) => (
              <Text key={idx} style={styles.language}>
                • {lang}
              </Text>
            ))}
          </View>
        )}

        {/* Additional Information */}
        {resume.additional && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>ADDITIONAL INFORMATION</Text>
              {isPremium && <View style={premiumStyles.sectionTitleUnderline} />}
            </View>
            <Text style={styles.additional}>{resume.additional}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
