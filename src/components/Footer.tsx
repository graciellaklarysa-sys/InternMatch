import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#142B4A]/10 bg-[#F7F8F5] pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#142B4A]/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#142B4A] rounded-xl flex items-center justify-center text-white font-bold text-base">
              <span className="lowercase">in</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[#142B4A]">InternMatch</span>
              <p className="text-xs text-[#142B4A]/60 font-medium">Find the internships that fit you.</p>
            </div>
          </div>

          {/* Script hand-drawn accent */}
          <div className="text-center md:text-right">
            <p className="font-handwritten text-2xl text-[#142B4A] rotate-[-1deg]">
              “Your potential has a place here.”
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#142B4A]/60 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38B879]" />
            <span>
              <strong>Disclosure:</strong> All internship listings and metrics are demo data for illustration.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>Decision Support for University Students</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#38B879]" /> Objective Fit Scoring
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
