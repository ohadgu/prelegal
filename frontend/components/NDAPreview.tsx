"use client";

import React, { forwardRef } from "react";
import {
  NDAFormData,
  formatDate,
  getMndaTerm,
  getConfidentialityTerm,
  getFilledSections,
  StandardTermsSection,
} from "@/lib/nda";

interface NDAPreviewProps {
  data: NDAFormData;
}

const NDAPreview = forwardRef<HTMLDivElement, NDAPreviewProps>(({ data }, ref) => {
  const sections = getFilledSections(data);

  return (
    <div
      ref={ref}
      className="bg-white"
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: "#1a1a1a",
        padding: "72px 80px",
        maxWidth: "816px",
        margin: "0 auto",
        lineHeight: "1.65",
        fontSize: "13px",
      }}
    >
      {/* Document Header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "8px", fontFamily: "system-ui, sans-serif" }}>
          COMMON PAPER STANDARD AGREEMENT
        </p>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "700",
            letterSpacing: "0.02em",
            margin: "0 0 6px",
            color: "#111827",
          }}
        >
          Mutual Non-Disclosure Agreement
        </h1>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, fontFamily: "system-ui, sans-serif" }}>
          Standard Terms Version 1.0
        </p>
      </div>

      {/* Cover Page */}
      <section style={{ marginBottom: "40px" }}>
        <SectionHeading>Cover Page</SectionHeading>
        <p style={{ fontSize: "12px", fontStyle: "italic", color: "#374151", marginBottom: "20px", lineHeight: "1.6" }}>
          This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;) consists of: (1) this Cover Page and (2) the
          Common Paper Mutual NDA Standard Terms Version 1.0 identical to those posted at{" "}
          <a href="https://commonpaper.com/standards/mutual-nda/1.0" style={{ color: "#1d4ed8" }}>
            commonpaper.com/standards/mutual-nda/1.0
          </a>
          . Any modifications of the Standard Terms should be made on the Cover Page, which will control over
          conflicts with the Standard Terms.
        </p>

        {/* Cover page fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <CoverRow label="Purpose" note="How Confidential Information may be used">
            <Filled value={data.purpose} placeholder="Not specified" />
          </CoverRow>

          <CoverRow label="Effective Date">
            <Filled value={formatDate(data.effectiveDate)} />
          </CoverRow>

          <CoverRow label="MNDA Term" note="The length of this MNDA">
            {data.mndaTermType === "expires" ? (
              <span>
                Expires {data.mndaTermYears || "1"} year(s) from Effective Date.
              </span>
            ) : (
              <span>Continues until terminated in accordance with the terms of the MNDA.</span>
            )}
          </CoverRow>

          <CoverRow label="Term of Confidentiality" note="How long Confidential Information is protected">
            {data.confidentialityTermType === "years" ? (
              <span>
                {data.confidentialityTermYears || "1"} year(s) from Effective Date, but in the case of trade secrets
                until Confidential Information is no longer considered a trade secret under applicable laws.
              </span>
            ) : (
              <span>In perpetuity.</span>
            )}
          </CoverRow>

          <CoverRow label="Governing Law & Jurisdiction">
            <div>
              <div>
                <span style={{ fontWeight: 600 }}>Governing Law: </span>
                <Filled value={data.governingLaw} placeholder="[State]" />
              </div>
              <div style={{ marginTop: "2px" }}>
                <span style={{ fontWeight: 600 }}>Jurisdiction: </span>
                <Filled value={data.jurisdiction} placeholder="[City/County and State]" />
              </div>
            </div>
          </CoverRow>

          {data.modifications && (
            <CoverRow label="MNDA Modifications">
              <span style={{ whiteSpace: "pre-wrap" }}>{data.modifications}</span>
            </CoverRow>
          )}
        </div>

        {/* Signature block */}
        <div style={{ marginTop: "28px" }}>
          <p style={{ fontSize: "12px", marginBottom: "12px", fontStyle: "italic" }}>
            By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>&nbsp;</th>
                <th style={{ ...thStyle, textAlign: "center" }}>PARTY 1</th>
                <th style={{ ...thStyle, textAlign: "center" }}>PARTY 2</th>
              </tr>
            </thead>
            <tbody>
              <SignatureRow label="Company" v1={data.party1Company} v2={data.party2Company} />
              <SignatureRow label="Print Name" v1={data.party1Name} v2={data.party2Name} />
              <SignatureRow label="Title" v1={data.party1Title} v2={data.party2Title} />
              <SignatureRow label="Signature" v1="" v2="" tall />
              <SignatureRow label="Date" v1="" v2="" />
              <SignatureRow label="Notice Address" v1={data.party1Address} v2={data.party2Address} />
            </tbody>
          </table>
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "2px solid #111827", margin: "40px 0" }} />

      {/* Standard Terms */}
      <section>
        <SectionHeading>Standard Terms</SectionHeading>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {sections.map((s) => (
            <TermSection key={s.number} section={s} />
          ))}
        </div>
      </section>

      {/* Attribution */}
      <div
        style={{
          marginTop: "40px",
          paddingTop: "16px",
          borderTop: "1px solid #d1d5db",
          textAlign: "center",
          fontSize: "11px",
          color: "#6b7280",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Common Paper Mutual Non-Disclosure Agreement{" "}
        <a href="https://commonpaper.com/standards/mutual-nda/1.0/" style={{ color: "#1d4ed8" }}>
          Version 1.0
        </a>{" "}
        free to use under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/" style={{ color: "#1d4ed8" }}>
          CC BY 4.0
        </a>
        .
      </div>
    </div>
  );
});

NDAPreview.displayName = "NDAPreview";
export default NDAPreview;

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "14px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        borderBottom: "2px solid #111827",
        paddingBottom: "6px",
        marginBottom: "20px",
        fontFamily: "system-ui, sans-serif",
        color: "#111827",
      }}
    >
      {children}
    </h2>
  );
}

function CoverRow({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <div style={{ width: "200px", flexShrink: 0 }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: "12px",
            fontFamily: "system-ui, sans-serif",
            color: "#374151",
          }}
        >
          {label}
        </span>
        {note && (
          <p style={{ fontSize: "11px", color: "#6b7280", fontStyle: "italic", margin: "2px 0 0", fontFamily: "system-ui, sans-serif" }}>
            {note}
          </p>
        )}
      </div>
      <div style={{ flex: 1, fontSize: "12px" }}>{children}</div>
    </div>
  );
}

function Filled({ value, placeholder }: { value: string; placeholder?: string }) {
  if (!value) {
    return (
      <span style={{ color: "#9ca3af", fontStyle: "italic" }}>
        {placeholder || "[Not provided]"}
      </span>
    );
  }
  return <span>{value}</span>;
}

const thStyle: React.CSSProperties = {
  border: "1px solid #9ca3af",
  padding: "6px 10px",
  fontWeight: 600,
  backgroundColor: "#f9fafb",
  fontFamily: "system-ui, sans-serif",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #9ca3af",
  padding: "7px 10px",
  verticalAlign: "top",
  fontSize: "12px",
};

function SignatureRow({
  label,
  v1,
  v2,
  tall,
}: {
  label: string;
  v1: string;
  v2: string;
  tall?: boolean;
}) {
  const cellStyle: React.CSSProperties = {
    ...tdStyle,
    height: tall ? "44px" : undefined,
  };
  return (
    <tr>
      <td style={{ ...tdStyle, fontWeight: 600, backgroundColor: "#f9fafb", fontFamily: "system-ui, sans-serif", width: "150px" }}>
        {label}
      </td>
      <td style={cellStyle}>{v1}</td>
      <td style={cellStyle}>{v2}</td>
    </tr>
  );
}

function renderInline(text: string): React.ReactNode[] {
  // Handles **bold** and [link text](url) patterns
  const parts = text.split(/(\*\*(?:[^*]|\*(?!\*))+\*\*|\[[^\]]*\]\([^)]*\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]*)\]\(([^)]*)\)$/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} style={{ color: "#1d4ed8" }}>
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

function TermSection({ section }: { section: StandardTermsSection }) {
  return (
    <p style={{ margin: 0 }}>
      <span style={{ fontWeight: 700 }}>{section.number}. </span>
      <span style={{ fontWeight: 700 }}>{section.title}. </span>
      {renderInline(section.body)}
    </p>
  );
}
