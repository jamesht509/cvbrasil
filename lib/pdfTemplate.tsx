import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";
import type { UsResume } from "./schemas";

// Helvetica is the default font in React-PDF, no need to register

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 40,
    color: "#000000"
  },
  header: {
    marginBottom: 20
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4
  },
  headline: {
    fontSize: 11,
    color: "#666666",
    marginBottom: 8
  },
  contact: {
    fontSize: 9,
    color: "#333333",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  contactItem: {
    marginRight: 12
  },
  section: {
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 6,
    borderBottom: "1px solid #000000",
    paddingBottom: 2
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6
  },
  skill: {
    fontSize: 9,
    marginRight: 8,
    marginBottom: 4
  },
  experienceItem: {
    marginBottom: 10
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: "bold"
  },
  experienceCompany: {
    fontSize: 10,
    color: "#333333"
  },
  experienceDates: {
    fontSize: 9,
    color: "#666666"
  },
  experienceLocation: {
    fontSize: 9,
    color: "#666666",
    marginTop: 2
  },
  bullet: {
    fontSize: 9,
    marginLeft: 10,
    marginBottom: 3,
    lineHeight: 1.4
  },
  bulletText: {
    marginLeft: 4
  },
  educationItem: {
    marginBottom: 8
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2
  },
  educationSchool: {
    fontSize: 10,
    fontWeight: "bold"
  },
  educationDegree: {
    fontSize: 9,
    color: "#333333"
  },
  educationDate: {
    fontSize: 9,
    color: "#666666"
  },
  certification: {
    fontSize: 9,
    marginBottom: 3
  },
  projectItem: {
    marginBottom: 6
  },
  projectName: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2
  },
  projectDescription: {
    fontSize: 9,
    color: "#333333",
    marginBottom: 2
  },
  projectTech: {
    fontSize: 8,
    color: "#666666",
    fontStyle: "italic"
  }
});

interface ResumePdfDocumentProps {
  resume: UsResume;
}

export function ResumePdfDocument({ resume }: ResumePdfDocumentProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.contact.fullName}</Text>
          {resume.contact.headline && (
            <Text style={styles.headline}>{resume.contact.headline}</Text>
          )}
          <View style={styles.contact}>
            {resume.contact.location && (
              <Text style={styles.contactItem}>{resume.contact.location}</Text>
            )}
            {resume.contact.phone && (
              <Text style={styles.contactItem}>{resume.contact.phone}</Text>
            )}
            {resume.contact.email && (
              <Text style={styles.contactItem}>{resume.contact.email}</Text>
            )}
            {resume.contact.linkedin && (
              <Text style={styles.contactItem}>{resume.contact.linkedin}</Text>
            )}
            {resume.contact.portfolio && (
              <Text style={styles.contactItem}>{resume.contact.portfolio}</Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{resume.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsList}>
              {resume.skills.map((skill, idx) => (
                <Text key={idx} style={styles.skill}>
                  {skill}
                  {idx < resume.skills.length - 1 ? " • " : ""}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Professional Experience */}
        {resume.experience && resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resume.experience.map((exp, idx) => (
              <View key={idx} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.experienceTitle}>{exp.title}</Text>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                    <Text style={styles.experienceLocation}>{exp.location}</Text>
                  </View>
                  <Text style={styles.experienceDates}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                {exp.bullets.map((bullet, bulletIdx) => (
                  <View key={bulletIdx} style={styles.bullet}>
                    <Text>
                      • <Text style={styles.bulletText}>{bullet}</Text>
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, idx) => (
              <View key={idx} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                    <Text style={styles.educationDegree}>
                      {edu.degree}
                      {edu.field && `, ${edu.field}`}
                    </Text>
                    <Text style={styles.experienceLocation}>{edu.location}</Text>
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
        {resume.certifications &&
          resume.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
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
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((project, idx) => (
              <View key={idx} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.description && (
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                )}
                {project.technologies &&
                  project.technologies.length > 0 && (
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
            <Text style={styles.sectionTitle}>Languages</Text>
            {resume.languages.map((lang, idx) => (
              <Text key={idx} style={styles.certification}>
                • {lang}
              </Text>
            ))}
          </View>
        )}

        {/* Additional Information */}
        {resume.additional && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <Text style={styles.summary}>{resume.additional}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}

