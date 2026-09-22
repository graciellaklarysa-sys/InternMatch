import React, { useState } from "react";
import { Internship, ScoredInternship } from "../types";
import { sampleCvBullets } from "../data/mockData";
import {
  FileCheck2,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  AlertCircle,
  Building2,
  Send,
  Loader2,
  RefreshCw,
  Lightbulb,
} from "lucide-react";

interface CvTailoringViewProps {
  internships: Internship[];
  preselectedInternshipId?: number;
}

export const CvTailoringView: React.FC<CvTailoringViewProps> = ({
  internships,
  preselectedInternshipId,
}) => {
  const [selectedInternshipId, setSelectedInternshipId] = useState<number>(
    preselectedInternshipId || (internships[0]?.id ?? 1)
  );
  const [bulletInput, setBulletInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Result state
  const [result, setResult] = useState<{
    original: string;
    rewrittenBullet: string;
    explanation: string;
    matchedSkills: string[];
  } | null>(null);

  const targetInternship =
    internships.find((i) => i.id === selectedInternshipId) || internships[0];

  const handleTailorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tailor-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bullet: bulletInput.trim(),
          internshipTitle: targetInternship.title,
          company: targetInternship.company,
          requiredSkills: targetInternship.requiredSkills.map((s) => s.name),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Unable to polish bullet point right now.");
      }

      const data = await response.json();
      setResult({
        original: bulletInput.trim(),
        rewrittenBullet: data.rewrittenBullet,
        explanation: data.explanation,
        matchedSkills: data.matchedSkills || [],
      });
    } catch (err: unknown) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while tailoring your bullet point."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.rewrittenBullet) return;
    navigator.clipboard.writeText(result.rewrittenBullet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#142B4A]/10 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDEAF4] text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-2">
          <FileCheck2 className="w-3.5 h-3.5 text-[#38B879]" />
          <span>Application Preparation</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#142B4A] tracking-tight">
          CV Bullet Tailoring
        </h1>
        <p className="text-sm text-[#142B4A]/70 mt-1 max-w-2xl">
          Restructure your achievements to highlight relevant competencies for your target internship — without fabricating metrics, tools, or unearned claims.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 shadow-navy-soft border border-[#142B4A]/10 space-y-5">
          <form onSubmit={handleTailorSubmit} className="space-y-4">
            {/* Target Role Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider mb-1.5">
                Target Internship Role
              </label>
              <div className="relative">
                <select
                  value={selectedInternshipId}
                  onChange={(e) => setSelectedInternshipId(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#142B4A]/20 bg-white text-sm font-semibold text-[#142B4A] focus:outline-none focus:border-[#38B879] focus:ring-1 focus:ring-[#38B879]"
                >
                  {internships.map((internship) => (
                    <option key={internship.id} value={internship.id}>
                      {internship.title} — {internship.company} ({internship.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Required skills chip summary */}
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-[11px] text-[#142B4A]/60 font-medium self-center mr-1">
                  Focus skills:
                </span>
                {targetInternship.requiredSkills.map((s) => (
                  <span
                    key={s.name}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DDEAF4] text-[#142B4A]"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Input Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                  Your Original CV Bullet
                </label>
                <span className="text-[11px] text-[#142B4A]/50">
                  {bulletInput.length}/300
                </span>
              </div>
              <textarea
                rows={4}
                value={bulletInput}
                onChange={(e) => setBulletInput(e.target.value)}
                placeholder="Paste an existing bullet point (e.g. Managed social media account for campus festival and made poster graphics using Canva)..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] focus:ring-1 focus:ring-[#38B879] text-sm text-[#142B4A] leading-relaxed resize-none"
              />
            </div>

            {/* Quick Sample Bullets */}
            <div>
              <span className="text-[11px] font-bold text-[#142B4A]/70 flex items-center gap-1 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#FCC85B]" />
                Try a student example:
              </span>
              <div className="space-y-1.5">
                {sampleCvBullets.slice(0, 3).map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBulletInput(sample)}
                    className="w-full text-left text-xs p-2 rounded-lg bg-[#F7F8F5] hover:bg-[#DDEAF4]/60 text-[#142B4A]/80 hover:text-[#142B4A] transition-colors leading-snug border border-[#142B4A]/5 truncate"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>

            {/* Inline Error Notice */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Unable to tailor bullet</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !bulletInput.trim()}
              className="w-full bg-[#38B879] hover:bg-[#2fa068] active:bg-[#278b5a] disabled:bg-[#142B4A]/20 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-full shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Restructuring for {targetInternship.company}...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Tailor Bullet Point</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Column: Side-by-Side View */}
        <div className="lg:col-span-6 space-y-4">
          {result ? (
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-navy-soft border border-[#142B4A]/10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold text-[#38B879] tracking-wider">
                  Tailored Comparison
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#142B4A] bg-[#DDEAF4] hover:bg-[#c9e0ef] px-3 py-1.5 rounded-full transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#38B879]" />
                      <span className="text-[#38B879]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Bullet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Original */}
              <div className="p-3.5 rounded-xl bg-[#F7F8F5] border border-[#142B4A]/5">
                <span className="block text-[11px] font-bold uppercase text-[#142B4A]/50 tracking-wider mb-1">
                  Original
                </span>
                <p className="text-xs sm:text-sm text-[#142B4A]/80 italic leading-relaxed">
                  "{result.original}"
                </p>
              </div>

              {/* Rewritten */}
              <div className="p-4 rounded-xl bg-[#38B879]/10 border border-[#38B879]/30">
                <span className="block text-[11px] font-bold uppercase text-[#38B879] tracking-wider mb-1">
                  Sharpened & Tailored
                </span>
                <p className="text-sm font-semibold text-[#142B4A] leading-relaxed">
                  • {result.rewrittenBullet}
                </p>
              </div>

              {/* Structural Explanation */}
              <div className="text-xs text-[#142B4A]/70 space-y-2 border-t border-[#142B4A]/10 pt-3">
                <p className="font-semibold text-[#142B4A]">
                  Enhancement Note:
                </p>
                <p>{result.explanation}</p>
                {result.matchedSkills.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="font-bold text-[#142B4A]">Targeted skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {result.matchedSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded-md bg-[#DDEAF4] text-[#142B4A] font-bold text-[10px]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Placeholder before first generation */
            <div className="bg-white/60 rounded-2xl p-8 border border-dashed border-[#142B4A]/20 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] mx-auto">
                <FileCheck2 className="w-6 h-6 text-[#38B879]" />
              </div>
              <h3 className="text-base font-bold text-[#142B4A]">
                Side-by-Side Review
              </h3>
              <p className="text-xs sm:text-sm text-[#142B4A]/60 max-w-sm mx-auto leading-relaxed">
                Submit an existing resume sentence or bullet point on the left. You'll see how professional phrasing highlights your authentic experience for this exact role.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
