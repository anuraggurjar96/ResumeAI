function OverviewCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={26} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;