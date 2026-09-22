/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { ActiveTab, ScoredInternship, UserProfile } from "./types";
import { mockInternships, mockUser } from "./data/mockData";
import { scoreAllInternships } from "./utils/scoring";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomeView } from "./views/HomeView";
import { MatchesView } from "./views/MatchesView";
import { MatchDetailView } from "./views/MatchDetailView";
import { ProfileBuilderView } from "./views/ProfileBuilderView";
import { CvTailoringView } from "./views/CvTailoringView";
import { ProfileView } from "./views/ProfileView";

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>("home");
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [selectedScoredInternship, setSelectedScoredInternship] =
    useState<ScoredInternship | null>(null);
  const [preselectedInternshipIdForCv, setPreselectedInternshipIdForCv] =
    useState<number | undefined>(undefined);
  const [notification, setNotification] = useState<string | null>(null);

  // Compute live match scores whenever user profile updates
  const scoredInternships = useMemo(() => {
    return scoreAllInternships(user, mockInternships);
  }, [user]);

  // Keep selected internship updated if user changes
  const activeDetailScored = useMemo(() => {
    if (!selectedScoredInternship) return null;
    return (
      scoredInternships.find(
        (s) => s.internship.id === selectedScoredInternship.internship.id
      ) || selectedScoredInternship
    );
  }, [scoredInternships, selectedScoredInternship]);

  const bestMatchScore = useMemo(() => {
    if (scoredInternships.length === 0) return 0;
    return Math.max(...scoredInternships.map((s) => s.breakdown.overallScore));
  }, [scoredInternships]);

  const handleSelectInternship = (scored: ScoredInternship) => {
    setSelectedScoredInternship(scored);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTailorApplication = (scored: ScoredInternship) => {
    setPreselectedInternshipIdForCv(scored.internship.id);
    setSelectedScoredInternship(null);
    setCurrentTab("application");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setUser(updated);
    setCurrentTab("for-you");
    showNotification("Profile updated! Match scores recalculated.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetDemoProfile = () => {
    setUser(mockUser);
    showNotification("Reset to benchmark student profile.");
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setSelectedScoredInternship(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F5] text-[#142B4A]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142B4A] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg border border-[#38B879]/40 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#38B879]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Persistent Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        bestMatchScore={bestMatchScore}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedScoredInternship && activeDetailScored ? (
          <MatchDetailView
            scored={activeDetailScored}
            user={user}
            onBack={() => setSelectedScoredInternship(null)}
            onTailorApplication={handleTailorApplication}
          />
        ) : (
          <>
            {currentTab === "home" && (
              <HomeView
                user={user}
                scoredInternships={scoredInternships}
                onNavigate={handleTabChange}
                onSelectInternship={handleSelectInternship}
              />
            )}

            {currentTab === "explore" && (
              <MatchesView
                scoredInternships={scoredInternships}
                onSelectInternship={handleSelectInternship}
                title="Explore Opportunities"
                subtitle="All verified partner listings with live objective fit scores calculated for you."
              />
            )}

            {currentTab === "for-you" && (
              <MatchesView
                scoredInternships={scoredInternships}
                onSelectInternship={handleSelectInternship}
                title="For You"
                subtitle="Internships matching your skills, interests, and academic background."
              />
            )}

            {currentTab === "my-match" && (
              <MatchesView
                scoredInternships={scoredInternships}
                onSelectInternship={handleSelectInternship}
                title="My Match"
                subtitle="Your calibrated opportunities ordered by comprehensive alignment."
              />
            )}

            {currentTab === "profile-builder" && (
              <ProfileBuilderView
                initialUser={user}
                onSaveProfile={handleSaveProfile}
                onCancel={() => handleTabChange("home")}
              />
            )}

            {currentTab === "application" && (
              <CvTailoringView
                internships={mockInternships}
                preselectedInternshipId={preselectedInternshipIdForCv}
              />
            )}

            {currentTab === "profile" && (
              <ProfileView
                user={user}
                onEditProfile={() => setCurrentTab("profile-builder")}
                onResetDemoProfile={handleResetDemoProfile}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
