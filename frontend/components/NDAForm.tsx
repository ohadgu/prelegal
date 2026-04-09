"use client";

import { NDAFormData } from "@/lib/nda";

interface NDAFormProps {
  data: NDAFormData;
  onChange: (data: NDAFormData) => void;
}

export default function NDAForm({ data, onChange }: NDAFormProps) {
  const set = (field: keyof NDAFormData, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="p-6 space-y-7 text-gray-800">
      {/* Document Details */}
      <FormSection title="Document Details">
        <Field label="Purpose" note="How Confidential Information may be used">
          <textarea
            value={data.purpose}
            onChange={(e) => set("purpose", e.target.value)}
            rows={3}
            className={`${input} resize-none`}
          />
        </Field>
        <Field label="Effective Date">
          <input
            type="date"
            value={data.effectiveDate}
            onChange={(e) => set("effectiveDate", e.target.value)}
            className={input}
          />
        </Field>
      </FormSection>

      {/* Duration */}
      <FormSection title="Duration">
        <Field label="MNDA Term" note="Length of the agreement">
          <div className="space-y-2 pt-0.5">
            <RadioRow
              name="mndaTermType"
              checked={data.mndaTermType === "expires"}
              onChange={() => set("mndaTermType", "expires")}
            >
              <span className="text-sm text-gray-700">Expires after</span>
              <input
                type="number"
                value={data.mndaTermYears}
                onChange={(e) => set("mndaTermYears", e.target.value)}
                min="1"
                disabled={data.mndaTermType !== "expires"}
                className="w-16 rounded border border-gray-300 px-2 py-1 text-sm text-center disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-1 focus:ring-navy-800"
              />
              <span className="text-sm text-gray-700">year(s) from Effective Date</span>
            </RadioRow>
            <RadioRow
              name="mndaTermType"
              checked={data.mndaTermType === "continues"}
              onChange={() => set("mndaTermType", "continues")}
            >
              <span className="text-sm text-gray-700">Continues until terminated</span>
            </RadioRow>
          </div>
        </Field>

        <Field label="Term of Confidentiality" note="How long information stays protected">
          <div className="space-y-2 pt-0.5">
            <RadioRow
              name="confTermType"
              checked={data.confidentialityTermType === "years"}
              onChange={() => set("confidentialityTermType", "years")}
            >
              <input
                type="number"
                value={data.confidentialityTermYears}
                onChange={(e) => set("confidentialityTermYears", e.target.value)}
                min="1"
                disabled={data.confidentialityTermType !== "years"}
                className="w-16 rounded border border-gray-300 px-2 py-1 text-sm text-center disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-1 focus:ring-navy-800"
              />
              <span className="text-sm text-gray-700">year(s) from Effective Date</span>
            </RadioRow>
            <RadioRow
              name="confTermType"
              checked={data.confidentialityTermType === "perpetuity"}
              onChange={() => set("confidentialityTermType", "perpetuity")}
            >
              <span className="text-sm text-gray-700">In perpetuity</span>
            </RadioRow>
          </div>
        </Field>
      </FormSection>

      {/* Legal */}
      <FormSection title="Legal">
        <Field label="Governing Law" note="State whose laws govern this MNDA">
          <input
            type="text"
            value={data.governingLaw}
            onChange={(e) => set("governingLaw", e.target.value)}
            placeholder="e.g. Delaware"
            className={input}
          />
        </Field>
        <Field label="Jurisdiction" note="Courts with exclusive jurisdiction">
          <input
            type="text"
            value={data.jurisdiction}
            onChange={(e) => set("jurisdiction", e.target.value)}
            placeholder='e.g. courts located in New Castle, DE'
            className={input}
          />
        </Field>
      </FormSection>

      {/* Modifications */}
      <FormSection title="Modifications">
        <Field label="MNDA Modifications" note="Leave blank if none">
          <textarea
            value={data.modifications}
            onChange={(e) => set("modifications", e.target.value)}
            rows={3}
            placeholder="List any modifications to the standard terms…"
            className={`${input} resize-none`}
          />
        </Field>
      </FormSection>

      {/* Party 1 */}
      <FormSection title="Party 1">
        <Field label="Company">
          <input type="text" value={data.party1Company} onChange={(e) => set("party1Company", e.target.value)} className={input} />
        </Field>
        <Field label="Name">
          <input type="text" value={data.party1Name} onChange={(e) => set("party1Name", e.target.value)} className={input} />
        </Field>
        <Field label="Title">
          <input type="text" value={data.party1Title} onChange={(e) => set("party1Title", e.target.value)} className={input} />
        </Field>
        <Field label="Notice Address" note="Email or postal address">
          <input type="text" value={data.party1Address} onChange={(e) => set("party1Address", e.target.value)} className={input} />
        </Field>
      </FormSection>

      {/* Party 2 */}
      <FormSection title="Party 2">
        <Field label="Company">
          <input type="text" value={data.party2Company} onChange={(e) => set("party2Company", e.target.value)} className={input} />
        </Field>
        <Field label="Name">
          <input type="text" value={data.party2Name} onChange={(e) => set("party2Name", e.target.value)} className={input} />
        </Field>
        <Field label="Title">
          <input type="text" value={data.party2Title} onChange={(e) => set("party2Title", e.target.value)} className={input} />
        </Field>
        <Field label="Notice Address" note="Email or postal address">
          <input type="text" value={data.party2Address} onChange={(e) => set("party2Address", e.target.value)} className={input} />
        </Field>
      </FormSection>
    </div>
  );
}

const input =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent transition-shadow";

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {note && <span className="ml-1.5 text-xs font-normal text-gray-400">— {note}</span>}
      </label>
      {children}
    </div>
  );
}

function RadioRow({
  name,
  checked,
  onChange,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 accent-navy-800 cursor-pointer"
      />
      <span className="flex items-center gap-1.5 flex-wrap">{children}</span>
    </label>
  );
}
