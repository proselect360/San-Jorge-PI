import React, { useMemo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Graticule,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Configuración de la Sede Mosquera
const SJP_COORDINATES: [number, number] = [-74.223, 4.71];

const InteractiveMap = () => {
    // Generamos una rejilla de puntos para el efecto "SVG Directo"
    // Optimizamos la densidad para mejorar el rendimiento
    const points = useMemo(() => {
        const dotPoints = [];
        const step = 5.0; // Aumentamos el espaciado para reducir el número de elementos DOM
        for (let x = -180; x <= 180; x += step) {
            for (let y = -90; y <= 90; y += step) {
                dotPoints.push([x, y]);
            }
        }
        return dotPoints;
    }, []);

    return (
        <div className="w-full h-full relative group bg-slate-950/20">
            <ComposableMap
                projectionConfig={{
                    scale: 190,
                    center: [-40, 15],
                }}
                className="w-full h-full"
            >
                {/* Graticule para feeling de ingeniería */}
                <Graticule stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />

                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="rgba(30, 41, 59, 0.8)"
                                stroke="rgba(242, 116, 5, 0.15)"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: "none" },
                                    hover: { fill: "rgba(242, 116, 5, 0.25)", outline: "none" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {/* Capa de Puntos SVG (Look Técnico / High-End) */}
                <g className="pointer-events-none opacity-20">
                    {points.map((point, i) => (
                        <Marker key={i} coordinates={[point[0], point[1]]}>
                            <circle r={0.8} fill="rgba(255,255,255,0.4)" />
                        </Marker>
                    ))}
                </g>

                {/* Marcador San Jorge PI - Sede Mosquera */}
                <Marker coordinates={SJP_COORDINATES}>
                    {/* Efecto de Radar / Pin */}
                    <g className="cursor-pointer">
                        <circle r={12} fill="var(--sjp-primary)" opacity={0.15} className="animate-ping" />
                        <circle r={6} fill="var(--sjp-primary)" opacity={0.4} className="animate-pulse" />
                        <circle r={3} fill="var(--sjp-primary)" />
                        <circle r={2} fill="white" />
                    </g>

                    {/* Label flotante con Glassmorphism */}
                    <g transform="translate(15, -5)">
                        <rect x={0} y={-12} width={110} height={20} rx={4} fill="rgba(15, 23, 42, 0.8)" className="backdrop-blur-md" />
                        <text
                            x={8}
                            y={2}
                            style={{
                                fontFamily: "Outfit, system-ui",
                                fill: "white",
                                fontSize: "9px",
                                fontWeight: "800",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em"
                            }}
                        >
                            San Jorge PI
                        </text>
                    </g>
                </Marker>
            </ComposableMap>

            {/* Micro-textura de puntos extra para profundidad visual */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{
                backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)',
                backgroundSize: '12px 12px',
            }}></div>
        </div>
    );
};

export default InteractiveMap;
