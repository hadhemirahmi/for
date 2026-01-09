import React, { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiUsers, FiBook, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

const daysOfWeek = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 8; hour <= 23; hour++) {
    const hourStr = hour.toString().padStart(2, "0") + ":00";
    times.push(hourStr);
  }
  return times;
};

const timeSlots = generateTimeSlots(); // ['08:00', '09:00', ..., '23:00']

const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 85%)`;
};

function WeekCalendar({ allLessons }) {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        let response = allLessons;
        const sessionsWithColor = response.map((session) => ({
          ...session,
          color: getRandomPastelColor(),
        }));
        setSessions(sessionsWithColor);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSessions();
  }, []);

  const getSessionForSlot = (day, time) => {
    return sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      const sessionDay = daysOfWeek[sessionDate.getDay()];

      if (sessionDay !== day) return false;

      const start = session.start_time;
      const end = session.end_time;

      const timeIndex = timeSlots.indexOf(time);
      const startIndex = timeSlots.indexOf(start);
      const endIndex = timeSlots.indexOf(end);
      console.log("start:", start, "end:", end, "time:", time);
      console.log(timeIndex, startIndex, endIndex);
      if (startIndex === -1 || endIndex === -1 || timeIndex === -1) {
        return false;
      }

      if (startIndex <= endIndex) {
        return timeIndex >= startIndex && timeIndex < endIndex;
      } else {
        return timeIndex >= startIndex || timeIndex < endIndex;
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl w-lg shadow-lg ">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-2xl font-bold">Emploi du temps</h1>
        <p className="text-blue-100">Semaine en cours</p>
      </div>

      <div className=" p-4 w-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="sticky left-0 z-10 bg-gray-50 p-3 text-left text-gray-700 font-semibold border-b border-gray-200 min-w-[120px]">
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  <span>Jour</span>
                </div>
              </th>
              {timeSlots.map((time) => (
                <th
                  key={time}
                  className="p-3 text-center text-gray-700 font-semibold border-b border-gray-200 min-w-[80px]"
                >
                  <div className="flex flex-col items-center">
                    <FiClock className="mb-1" />
                    <span>{time}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => (
              <tr key={day} className="hover:bg-gray-50 transition-colors">
                <td className="sticky left-0 z-10 bg-white p-3 font-bold text-gray-800 border-b border-gray-200">
                  {day}
                </td>
                {timeSlots.map((time) => {
                  const slotSessions = getSessionForSlot(day, time);
                  return (
                    <td
                      key={`${day}-${time}`}
                      className={`p-1 border-b border-gray-200 ${
                        slotSessions.length > 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      {slotSessions.length > 0 ? (
                        slotSessions.map((session, index) => (
                          <motion.div
                            key={`${session._id}-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ backgroundColor: session.color }}
                            className="rounded-lg shadow-sm p-2 mb-1 border border-gray-200"
                          >
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div className="flex items-center text-sm font-semibold text-gray-800">
                                  <FiBook className="mr-1" />
                                  {session.subject?.subject_name}
                                </div>
                                <div className="flex items-center text-xs text-gray-600 mt-1">
                                  <FiUsers className="mr-1" />
                                  {session.group?.nom} - {session.group?.level}
                                </div>
                              </div>
                              <div className="text-xs bg-white bg-opacity-50 rounded px-1 py-0.5 text-gray-700">
                                {session.start_time} - {session.end_time}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="h-10 flex items-center justify-center text-gray-400">
                          -
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default WeekCalendar;
