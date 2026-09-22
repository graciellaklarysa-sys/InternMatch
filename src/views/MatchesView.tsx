import React, { useState, useMemo } from "react";
import { ScoredInternship } from "../types";
import { InternshipCard } from "../components/InternshipCard";
import { Search, SlidersHorizontal, Sparkles, Filter, RefreshCw } from "lucide-react";

type SortTab = "best-match" | "most-recent" | "most-relevant";

interface MatchesViewProps {
  scoredInternships: ScoredInternship[];
  onSelectInternship: (scored: ScoredInternship) => void;
  title?: string;
  subtitle?: string;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  scoredInternships,
  onSelectInternship,
  title = "For You",
  subtitle = "Opportunities scored directly against your profile criteria and verified skills.",
}) => {
  const [activeSort, setActiveSort] = useState<SortTab>("best-match");
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState<string>("All");

  const sortedAndFiltered = useMemo(() => {
    let list = [...scoredInternships];

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.internship.title.toLowerCase().includes(q) ||
          item.internship.company.toLowerCase().includes(q) ||
          item.internship.location.toLowerCase().includes(q) ||
          item.internship.requiredSkills.some((s) => s.name.toLowerCase().includes(q))
      );
    }

    // Filter by mode
    if (modeFilter !== "All") {
      list = list.filter((item) => item.internship.mode.toLowerCase() === modeFilter.toLowerCase());
    }

    // Sort
    if (activeSort === "best-match") {
      list.sort((a, b) => b.breakdown.overallScore - a.breakdown.overallScore);
    } else if (activeSort === "most-recent") {
      list.sort((a, b) => b.internship.id - a.internship.id);
    } else if (activeSort === "most-relevant") {
      // By interest overlap count, then by skill score
      list.sort((a, b) => {
        if (b.breakdown.interestOverlapCount !== a.breakdown.interestOverlapCount) {
          return b.breakdown.interestOverlapCount - a.breakdown.interestOverlapCount;
        }
        return b.breakdown.overallScore - a.breakdown.overallScore;
      });
    }

    return list;
  }, [scoredInternships, activeSort, searchQuery, modeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with handwritten accent */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#142B4A]/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-[#142B4A] tracking-tight">{title}</h1>
            {/* Near the matches list, as a handwritten accent verbatim */}
            <span className="font-handwritten text-2xl text-[#38B879] -rotate-1 select-none">
              Real opportunities. Real fit.
            </span>
          </div>
          <p className="text-sm text-[#142B4A]/70 mt-1">{subtitle}</p>
        </div>

        {/* Tabs: Best Match (default) / Most Recent / Most Relevant */}
        <div className="flex items-center p-1 bg-[#142B4A]/5 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setActiveSort("best-match")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSort === "best-match"
                ? "bg-white text-[#142B4A] shadow-xs"
                : "text-[#142B4A]/70 hover:text-[#142B4A]"
            }`}
          >
            Best Match
          </button>
          <button
            onClick={() => setActiveSort("most-recent")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSort === "most-recent"
                ? "bg-white text-[#142B4A] shadow-xs"
                : "text-[#142B4A]/70 hover:text-[#142B4A]"
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setActiveSort("most-relevant")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSort === "most-relevant"
                ? "bg-white text-[#142B4A] shadow-xs"
                : "text-[#142B4A]/70 hover:text-[#142B4A]"
            }`}
          >
            Most Relevant
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#142B4A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company, city, or skill requirement..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#142B4A]/15 focus:outline-none focus:border-[#38B879] focus:ring-1 focus:ring-[#38B879] text-sm text-[#142B4A]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#142B4A]/50 hover:text-[#142B4A]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Work Mode Quick Filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-[#142B4A]/60 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Mode:
          </span>
          {["All", "Hybrid", "Remote", "On-site"].map((mode) => (
            <button
              key={mode}
              onClick={() => setModeFilter(mode)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                modeFilter === mode
                  ? "bg-[#142B4A] text-white"
                  : "bg-white text-[#142B4A]/70 hover:bg-[#142B4A]/5 border border-[#142B4A]/15"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {sortedAndFiltered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFiltered.map((scored) => (
            <InternshipCard
              key={scored.internship.id}
              scored={scored}
              onSelect={onSelectInternship}
            />
          ))}
        </div>
      ) : (
        /* Empty State with friendly prompt */
        <div className="bg-white rounded-2xl p-12 text-center border border-[#142B4A]/10 shadow-navy-soft max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] mx-auto">
            <SlidersHorizontal className="w-5 h-5 text-[#38B879]" />
          </div>
          <h3 className="text-lg font-bold text-[#142B4A]">No opportunities found</h3>
          <p className="text-xs sm:text-sm text-[#142B4A]/70">
            No internships match your current search or filter criteria. Try adjusting your search query or reset the filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setModeFilter("All");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#38B879] text-white text-xs font-bold shadow-xs hover:bg-[#2fa068] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
