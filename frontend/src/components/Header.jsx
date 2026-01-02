import React from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = React.useState("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateString = now.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCurrentTime(`${dateString} - ${timeString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-4 md:mb-0">
        <h2 className="text-xl font-bold text-gray-800">
          Tableau de bord Admin
        </h2>
        <p className="text-gray-600">{currentTime || "Chargement..."}</p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
          <i className="fas fa-bell text-xl"></i>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center">
          <i className="fas fa-plus mr-2"></i> Nouveau cours
        </button>
      </div>
    </header>
  );
};

export default Header;
