import React from "react";
import { TrendingUp, Users, BookOpen, Star } from "lucide-react";

const HeroSection = () => {
  const stats = [
    {
      icon: <Users size={24} />,
      value: "75k+",
      label: "Utilisateurs satisfaits",
      change: "+12.5%",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <BookOpen size={24} />,
      value: "142",
      label: "Cours actifs",
      change: "+8.3%",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <TrendingUp size={24} />,
      value: "98%",
      label: "Satisfaction",
      change: "+2.1%",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Star size={24} />,
      value: "4.9",
      label: "Note moyenne",
      change: "+0.2",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Titre principal */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              EduLearn
              <span className="block text-3xl md:text-4xl font-semibold text-blue-400 mt-2">
                Tableau de bord Administrateur
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Gérez efficacement votre plateforme d'apprentissage avec des
              outils puissants, des statistiques en temps réel et une interface
              intuitive conçue pour les administrateurs.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 hover:shadow-xl">
              Commencer maintenant
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition">
              Explorer les fonctionnalités
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition">
              Voir les statistiques
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="flex items-center px-3 py-1 bg-green-500/20 rounded-full">
                    <TrendingUp size={14} className="mr-1" />
                    <span className="text-sm font-semibold text-green-400">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-gray-300 mt-2">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bannière d'information */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  📊 Statistiques détaillées disponibles
                </h3>
                <p className="text-gray-300">
                  Accédez à des analyses approfondies sur l'engagement des
                  utilisateurs, les performances des cours et les tendances
                  d'apprentissage.
                </p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
                Voir le rapport complet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
