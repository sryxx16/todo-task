const Preferensi = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Preferensi</h2>
      <p className="text-sm text-slate-500 mb-6">Sesuaikan tampilan dan preferensi aplikasi.</p>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Mode Tampilan</h4>
              <p className="text-xs text-slate-500">Pilih mode tampilan aplikasi.</p>
            </div>
          </div>
          <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-indigo-500">
            <option>Terang</option>
            <option>Gelap</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Bahasa</h4>
              <p className="text-xs text-slate-500">Pilih bahasa yang digunakan.</p>
            </div>
          </div>
          <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-indigo-500">
            <option>Bahasa Indonesia</option>
            <option>English</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Zona Waktu</h4>
              <p className="text-xs text-slate-500">Atur zona waktu kamu.</p>
            </div>
          </div>
          <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-indigo-500">
            <option>(GMT+07:00) WIB - Jakarta</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Preferensi;
