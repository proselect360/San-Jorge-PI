import React, { useMemo } from "react";
import { ComposableMap, Marker, Graticule } from "react-simple-maps";

const SJP_COORDINATES: [number, number] = [-74.223, 4.71];

const InteractiveMap = () => {
    const points = useMemo(() => {
        const dotPoints: [number, number][] = [];
        const step = 5.0;
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
                <Graticule stroke="rgba(255,255,255,0.05)" strokeWidth={0.6} />

                {/* Halo local para dar referencia visual aun sin geodata externa */}
                <Marker coordinates={SJP_COORDINATES}>
                    <g>
                        <circle r={60} fill="rgba(242,116,5,0.04)" />
                        <circle r={34} fill="rgba(242,116,5,0.06)" />
                    </g>
                </Marker>

                <g className="pointer-events-none opacity-20">
                    {points.map((point, i) => (
                        <Marker key={i} coordinates={[point[0], point[1]]}>
                            <circle r={0.8} fill="rgba(255,255,255,0.4)" />
                        </Marker>
                    ))}
                </g>

                <Marker coordinates={SJP_COORDINATES}>
                    <g className="cursor-pointer">
                        <circle r={12} fill="var(--sjp-primary)" opacity={0.15} className="animate-ping" />
                        <circle r={6} fill="var(--sjp-primary)" opacity={0.4} className="animate-pulse" />
                        <circle r={3} fill="var(--sjp-primary)" />
                        <circle r={2} fill="white" />
                    </g>

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
                                letterSpacing: "0.1em",
                            }}
                        >
                            San Jorge PI
                        </text>
                    </g>
                </Marker>
            </ComposableMap>

            <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                style={{
                    backgroundImage: "radial-gradient(circle, white 0.5px, transparent 0.5px)",
                    backgroundSize: "12px 12px",
                }}
            ></div>
        </div>
    );
};

export default InteractiveMap;
