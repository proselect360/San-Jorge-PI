import { useMemo, useState } from "react";

type PropertyType = "locales" | "oficinas" | "bodegas";

type PropertyItem = {
  id: number;
  type: PropertyType;
  title: string;
  area: string;
  status: "Disponible" | "Pronto";
};

const properties: PropertyItem[] = [
  { id: 1, type: "locales", title: "Local 1A - Plazoleta", area: "45 m2", status: "Disponible" },
  { id: 2, type: "locales", title: "Local 2C - Boulevard", area: "60 m2", status: "Pronto" },
  { id: 3, type: "oficinas", title: "Oficina 502 - Torre Norte", area: "82 m2", status: "Disponible" },
  { id: 4, type: "oficinas", title: "Oficina 307 - Torre Sur", area: "55 m2", status: "Disponible" },
  { id: 5, type: "bodegas", title: "Bodega B12 - Logistica", area: "120 m2", status: "Pronto" },
];

const labels: Record<PropertyType, string> = {
  locales: "Locales",
  oficinas: "Oficinas",
  bodegas: "Bodegas",
};

export default function PropertyTabs() {
  const [selected, setSelected] = useState<PropertyType>("locales");

  const filtered = useMemo(
    () => properties.filter((item) => item.type === selected),
    [selected],
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Selector Minimalista - Contraste Corregido */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-2 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 backdrop-blur-xl w-fit mx-auto dark:bg-slate-900 dark:border-slate-800">
        {(Object.keys(labels) as PropertyType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            className={`relative px-8 py-3 text-sm font-black uppercase tracking-widest transition-all duration-500 rounded-xl overflow-hidden ${selected === type
              ? "text-white shadow-2xl"
              : "text-slate-600 hover:text-black"
              }`}
          >
            <span className="relative z-10">{labels[type]}</span>
            {selected === type && (
              <div className="absolute inset-0 z-0 bg-(--sjp-primary) animate-scale-in"></div>
            )}
          </button>
        ))}
      </div>

      {/* Grid de Propiedades Neutral - Mejor Contraste */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-600">
                {labels[item.type]}
              </span>
              <span className={`h-2.5 w-2.5 rounded-full ${item.status === 'Disponible' ? 'bg-(--sjp-primary) animate-pulse' : 'bg-slate-300'}`}></span>
            </div>

            <h3 className="text-2xl font-black tracking-tight text-slate-950 capitalize transition-colors">
              {item.title}
            </h3>

            <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-100 opacity-80">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Dimensión</span>
                <span className="text-base font-black text-slate-950">{item.area}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Estado</span>
                <span className={`text-base font-black ${item.status === 'Disponible' ? 'text-(--sjp-primary)' : 'text-slate-400'}`}>{item.status}</span>
              </div>
            </div>

            {/* Icono Noir en Hover */}
            <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
