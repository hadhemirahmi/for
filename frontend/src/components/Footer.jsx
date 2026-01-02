import React from "react";
import {
  Heart,
  Code,
  Shield,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MessageSquare,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Produit: [
      { label: "Fonctionnalités", href: "#" },
      { label: "Tarification", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "API", href: "#" },
    ],
    Entreprise: [
      { label: "À propos", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Carrières", href: "#" },
      { label: "Contact", href: "#" },
    ],
    Ressources: [
      { label: "Centre d'aide", href: "#" },
      { label: "Status", href: "#" },
      { label: "Sécurité", href: "#" },
      { label: "RGPD", href: "#" },
    ],
    Légale: [
      { label: "Conditions d'utilisation", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Mentions légales", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: <Github size={20} />, label: "GitHub", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Mail size={20} />, label: "Email", href: "#" },
  ];

  const stats = [
    { label: "Uptime", value: "99.9%", icon: <Shield size={16} /> },
    { label: "Utilisateurs", value: "75k+", icon: <Globe size={16} /> },
    { label: "Support", value: "24/7", icon: <MessageSquare size={16} /> },
    { label: "Version", value: "2.1.0", icon: <Code size={16} /> },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale */}
      <div className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header du footer */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="md:w-1/3">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Code size={24} />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold">EduLearn</h2>
                    <p className="text-gray-400">Admin Dashboard</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">
                  Plateforme d'apprentissage moderne avec des outils puissants
                  pour les administrateurs, enseignants et étudiants.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Liens rapides */}
              <div className="md:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {Object.entries(links).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-4">{category}</h3>
                      <ul className="space-y-3">
                        {items.map((item, index) => (
                          <li key={index}>
                            <a
                              href={item.href}
                              className="text-gray-400 hover:text-white transition"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center mb-2">
                    <div className="text-blue-400 mr-2">{stat.icon}</div>
                    <span className="text-gray-400">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">
                    Restez informé des mises à jour
                  </h3>
                  <p className="text-gray-400">
                    Recevez les dernières nouvelles, mises à jour et astuces
                    directement dans votre boîte mail.
                  </p>
                </div>
                <div className="md:w-1/3">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition">
                      S'abonner
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    En vous inscrivant, vous acceptez notre politique de
                    confidentialité.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright et liens légaux */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-gray-400">
                <p>© {currentYear} EduLearn. Tous droits réservés.</p>
                <p className="text-sm mt-1">
                  Conçu avec <Heart size={12} className="inline text-red-500" />
                  pour améliorer l'apprentissage.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Politique de cookies
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Paramètres de confidentialité
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Conditions d'utilisation
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Plan du site
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bandeau système */}
      <div className="bg-black py-3">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Système opérationnel</span>
                </div>
                <span className="hidden md:inline text-gray-500">•</span>
                <span className="text-sm text-gray-400">
                  Dernière mise à jour : Aujourd'hui 14:30
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Version 2.1.0 • Build #2024.03.20
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
