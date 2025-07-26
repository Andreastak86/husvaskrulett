"use client";

import { useState } from "react";
// import { shuffle } from "./utils/shuffle";

const rooms = [
    "Badet 🚿🚽 🧻",
    "Kjøkkenet 🍽️ 🥄",
    "Spisestuen 🍽️🍴",
    "Gang + Trapp 🪜",
    "Vaskerom + Bod 🫧",
    "Loftstuen 🛋️",
];

const peopleWithWeight: Record<string, number> = {
    Tobias: 1,
    Amalie: 5,
    Lise: 1,
    Andreas: 1,
    Betine: 1,
    Glenn: 1,
};

const weights = Object.entries(peopleWithWeight).flatMap(([name, weight]) =>
    Array(weight).fill(name)
);

export default function Home() {
    const [assignments, setAssignments] = useState<
        { person: string; room: string }[]
    >([]);
    const [spinning, setSpinning] = useState(false);

    const handleSpin = () => {
        setSpinning(true);

        setTimeout(() => {
            const result: { person: string; room: string }[] = [];
            const used = new Set<string>();
            const availableRooms = [...rooms];

            const currentWeights = [...weights];

            for (let i = 0; i < rooms.length; i++) {
                const remainingWeights = currentWeights.filter(
                    (name) => !used.has(name)
                );

                if (remainingWeights.length === 0) break;

                const randomIndex = Math.floor(
                    Math.random() * remainingWeights.length
                );
                const chosen = remainingWeights[randomIndex];

                const room = availableRooms[i];

                result.push({
                    person: chosen,
                    room,
                });

                used.add(chosen);
            }

            setAssignments(result);
            setSpinning(false);
        }, 1000);
    };

    return (
        <main className='min-h-screen flex flex-col items-center justify-center p-8 text-center bg-roulette text-white'>
            <h1 className='text-[60px] font-extrabold mb-6 text-white bg-black bg-opacity-80 px-6 py-3 rounded-2xl shadow-lg'>
                🧽 Husvask-rulett
            </h1>
            <button
                onClick={handleSpin}
                className={`px-6 py-3 text-white rounded-2xl shadow transition-all text-xl font-semibold ${
                    spinning
                        ? "bg-yellow-400 animate-spin-slow cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={spinning}
            >
                {spinning ? "Trekker..." : "Start trekning"}
            </button>

            <div className='mt-10 space-y-4 max-w-xl w-full'>
                {assignments.map(({ person, room }) => (
                    <div
                        key={room}
                        className='bg-black bg-opacity-80 text-white p-4 rounded-xl shadow-lg border border-white/20 animate-fade-in'
                    >
                        <p className='text-xl sm:text-2xl font-semibold'>
                            🎯 <span className='text-green-300'>{person}</span>{" "}
                            fikk <span className='text-yellow-300'>{room}</span>
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
