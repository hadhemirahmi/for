import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-6 py-6 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold flex items-center">
            <i className="fas fa-graduation-cap mr-2"></i> EduLearn
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            © {new Date().getFullYear()} EduLearn. Tous droits réservés.
          </p>
        </div>

        <div className="flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition">
            À propos
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            Contact
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            Confidentialité
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
