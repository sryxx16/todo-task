import { Database, Download, Trash2 } from "lucide-react";

const BackupData = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Backup & Data</h2>
      <p className="text-sm text-slate-500 mb-6">Kelola data dan backup akun kamu.</p>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Database size={18} />
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Backup Data</h4>
              <p className="text-xs text-slate-500">Download backup semua data tugas kamu.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">
            <Download size={16} /> Download
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <Trash2 size={18} />
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Hapus Semua Data</h4>
              <p className="text-xs text-slate-500">Hapus semua data secara permanen.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
            <Trash2 size={16} /> Hapus Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackupData;
