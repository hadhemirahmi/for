import React, { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import StatsCards from "../components/StatsCards";
import FeatureCards from "../components/FeatureCards";
import RecentDocuments from "../components/RecentDocuments";
import QuickActions from "../components/QuickActions";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 75248,
    activeCourses: 142,
    teachers: 68,
    documents: 2847,
  });

  const [recentDocuments] = useState([
    {
      id: 1,
      title: "Introduction à MongoDB",
      type: "course",
      author: "Prof. Smith",
      timeAgo: "il y a 2 jours",
      icon: "file-pdf",
      color: "blue",
    },
    {
      id: 2,
      title: "Exercices Node.js",
      type: "TP",
      author: "Prof. Johnson",
      timeAgo: "il y a 3 jours",
      icon: "file-word",
      color: "green",
    },
    {
      id: 3,
      title: "Examen final 2024",
      type: "Exam",
      author: "Prof. Williams",
      timeAgo: "il y a 5 jours",
      icon: "file-excel",
      color: "purple",
    },
  ]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <HeroSection />

          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Statistiques et gestion
            </h3>

            <StatsCards stats={stats} />

            <h3 className="text-2xl font-bold text-gray-800 mb-6 mt-10">
              Gestion de la plateforme
            </h3>

            <FeatureCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <RecentDocuments documents={recentDocuments} />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
