import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // State buat nyimpen data dari API
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi buat nembak API Backend Laravel
    axios
      .get("http://localhost/api/tasks")
      .then((response) => {
        console.log("Berhasil dapet data:", response.data);
        // Karena di Controller tadi kita bungkus datanya di dalam properti 'data'
        setTasks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Waduh, error nembak API:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 p-10 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-2">
          Test Nembak API 🚀
        </h1>
        <p className="text-gray-400 mb-8">
          Data langsung ditarik dari Laravel backend.
        </p>

        {loading ? (
          <p className="text-yellow-400 animate-pulse">
            Lagi narik data, tunggu bentar...
          </p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task: any) => (
              <div
                key={task.id}
                className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-white">{task.title}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      task.priority === "Tinggi"
                        ? "bg-red-500/20 text-red-400"
                        : task.priority === "Sedang"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    Prioritas {task.priority}
                  </span>
                </div>

                <p className="text-blue-300 font-medium">{task.course?.name}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Dosen: {task.course?.lecturer_name}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-sm text-gray-300">
                    Status:{" "}
                    <span className="font-semibold text-white">
                      {task.status}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-green-400">
                    Progress: {task.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
