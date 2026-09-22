import React, { useState } from "react";
import { ActiveTab } from "../types";
import { Menu, X, Sparkles, Compass, HeartHandshake, FileCheck2, User, Home } from "lucide-react";

interface NavigationProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  bestMatchScore?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  bestMatchScore,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { id: "explore", label: "Explore", icon: <Compass className="w-4 h-4" /> },
    {
      id: "for-you",
      label: "For You",
      icon: <Sparkles className="w-4 h-4" />,
      badge: bestMatchScore ? `${bestMatchScore}%` : undefined,
    },
    { id: "my-match", label: "My Match", icon: <HeartHandshake className="w-4 h-4" /> },
    { id: "application", label: "Application", icon: <FileCheck2 className="w-4 h-4" /> },
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F8F5]/90 backdrop-blur-md border-b border-[#142B4A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleNavClick("home")}
              className="group flex items-center space-x-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38B879] rounded-lg p-1"
              aria-label="InternMatch Home"
            >
              {/* Lowercase "in" icon in a rounded navy square */}
              <div className="w-9 h-9 bg-[#142B4A] rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-sm transition-transform duration-200 group-hover:scale-105">
                <span className="leading-none tracking-tighter lowercase">in</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold text-[#142B4A] tracking-tight flex items-center gap-1">
                  InternMatch
                </span>
                <span className="text-[10px] text-[#142B4A]/60 font-semibold tracking-wider uppercase -mt-1 hidden sm:block">
                  Decision Support
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-150 flex items-center space-x-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38B879] ${
                    isActive
                      ? "text-[#142B4A] bg-[#DDEAF4]"
                      : "text-[#142B4A]/75 hover:text-[#142B4A] hover:bg-[#142B4A]/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold bg-[#38B879] text-white rounded-full leading-tight">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Green Pill "Get Started" */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick("profile-builder")}
              className="bg-[#38B879] hover:bg-[#2fa068] active:bg-[#278b5a] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 flex items-center space-x-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#142B4A] focus-visible:ring-offset-2"
            >
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => handleNavClick("profile-builder")}
              className="bg-[#38B879] text-white text-xs font-bold px-3 py-1.5 rounded-full"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#142B4A] hover:bg-[#142B4A]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38B879]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#142B4A]/10 bg-[#F7F8F5] px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold ${
                  isActive
                    ? "text-[#142B4A] bg-[#DDEAF4]"
                    : "text-[#142B4A]/80 hover:bg-[#142B4A]/5"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#38B879] text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
