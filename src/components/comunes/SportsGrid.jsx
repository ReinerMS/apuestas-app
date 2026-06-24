import sports from "@/data/sports";

export default function SportsGrid() {
  return (
    <section className="w-full py-2">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white">
          Deportes Disponibles
        </h2>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {sports.map((sport) => (
          <div
            key={sport.id}
            className="
              bg-slate-800
              hover:bg-slate-700
              border border-slate-700
              rounded-xl
              p-4
              cursor-pointer
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <div className="text-4xl mb-3">
              {sport.icon}
            </div>

            <h3 className="text-white font-semibold">
              {sport.name}
            </h3>

            <span className="text-sm text-gray-400">
              {sport.events} eventos
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}