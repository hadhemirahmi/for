import React from "react";

const HeroSection = () => {
  return (
    <section className="gradient-bg text-white px-6 md:px-8 py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">EduLearn</h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Améliorer l'expérience d'apprentissage pour tous
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Découvrez des cours en ligne personnalisés avec des enseignants
          professionnels, du contenu interactif et des tableaux de bord
          intelligents.
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <button className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition w-full md:w-auto">
            Commencer maintenant
          </button>

          <div className="flex items-center">
            <div className="flex -space-x-2">
              <img
                src="https://ui-avatars.com/api/?name=User+1&background=10b981&color=fff"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="User"
              />
              <img
                src="https://ui-avatars.com/api/?name=User+2&background=3b82f6&color=fff"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="User"
              />
              <img
                src="https://ui-avatars.com/api/?name=User+3&background=f59e0b&color=fff"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="User"
              />
            </div>
            <div className="ml-4">
              <p className="font-bold text-lg">75k+</p>
              <p className="text-sm opacity-90">utilisateurs satisfaits</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
