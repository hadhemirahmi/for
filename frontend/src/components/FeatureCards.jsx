import React from "react";
import {
  GraduationCap,
  Users,
  Video,
  Settings,
  ArrowRight,
  Star,
  Lock,
  Zap,
} from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      title: "Cours Étudiants",
      description:
        "Gérez l'ensemble des cours, le contenu pédagogique et les ressources d'apprentissage avec des outils modernes.",
      icon: <GraduationCap size={28} />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      stats: "245 nouveaux étudiants",
      link: "/admin/courses",
      features: ["Contenu interactif", "Suivi progression", "Évaluations"],
    },
    {
      title: "Tableau de bord Enseignant",
      description:
        "Fournissez aux enseignants des outils puissants pour gérer leurs classes, cours et évaluations.",
      icon: <Users size={28} />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      stats: "42 enseignants actifs",
      link: "/admin/teachers",
      features: ["Gestion classes", "Correction auto", "Analytics"],
    },
    {
      title: "Cours en Direct",
      description:
        "Organisez et gérez des sessions en temps réel avec des outils de visioconférence intégrés.",
      icon: <Video size={28} />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      stats: "78 sessions ce mois",
      link: "/admin/live",
      features: ["Visioconférence", "Partage écran", "Enregistrement"],
    },
    {
      title: "Gestion Admin",
      description:
        "Contrôle complet de la plateforme avec des outils d'administration et de supervision avancés.",
      icon: <Settings size={28} />,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      stats: "12k+ actions",
      link: "/admin/management",
      features: ["Permissions", "Audit logs", "Backup"],
    },
  ];

  const premiumFeatures = [
    {
      icon: <Zap size={20} />,
      title: "Performance optimisée",
      description: "Temps de chargement réduit de 40%",
    },
    {
      icon: <Lock size={20} />,
      title: "Sécurité renforcée",
      description: "Certification ISO 27001",
    },
    {
      icon: <Star size={20} />,
      title: "Support premium",
      description: "Réponse sous 2 heures",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Modules principaux
          </h3>
          <p className="text-gray-600">
            Gérez toutes les fonctionnalités de votre plateforme d'apprentissage
          </p>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Voir tous les modules
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Header avec gradient */}
            <div className={`h-2 bg-gradient-to-r ${feature.color}`} />

            <div className="p-6">
              {/* Icon et titre */}
              <div className="flex items-center mb-4">
                <div
                  className={`p-3 rounded-lg ${feature.bgColor} bg-gradient-to-r ${feature.color} text-white`}
                >
                  {feature.icon}
                </div>
                <h4 className="ml-4 text-xl font-bold text-gray-800">
                  {feature.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{feature.description}</p>

              {/* Features list */}
              <div className="mb-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                  Fonctionnalités :
                </h5>
                <ul className="space-y-2">
                  {feature.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats et lien */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <span className="text-gray-500">Ce mois : </span>
                  <span className="font-semibold text-gray-800">
                    {feature.stats}
                  </span>
                </div>
                <a
                  href={feature.link}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Accéder
                  <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Footer avec stat */}
            <div className={`px-6 py-3 text-sm ${feature.bgColor}`}>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <span className="font-medium">
                  Statut : <span className="text-green-600">Opérationnel</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Premium */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold mb-4">
              🚀 Fonctionnalités Premium
            </h3>
            <p className="text-gray-300 mb-6">
              Profitez de nos fonctionnalités avancées pour optimiser la gestion
              de votre plateforme d'apprentissage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                >
                  <div className="text-blue-400 mb-3">{feature.icon}</div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/3 lg:pl-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h4 className="text-xl font-bold mb-4">Mise à niveau</h4>
              <p className="text-gray-300 mb-6">
                Débloquez toutes les fonctionnalités premium pour votre
                organisation.
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition">
                Mettre à niveau maintenant
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                *Inclut support 24/7 et garantie SLA 99.9%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
