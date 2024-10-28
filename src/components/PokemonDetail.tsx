// src/PokemonDetail.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonData } from "../types";
// import { PokemonData } from "./types"; // Importing the PokemonData type

export const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data: PokemonData = await res.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }

  if (!pokemon) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <section className="container mx-auto px-4 py-8 border border-black bg-white rounded-lg h-screen justify-center items-center shadow-lg flex gap-10 md:flex-row flex-col">
      <div className="flex flex-col items-center mb-6 lg:w-1/2 w-full">
        <img
          src={pokemon.sprites?.other?.dream_world?.front_default}
          alt={pokemon.name}
          className="w-60 h-60 mb-4 transition-transform transform hover:scale-110"
        />
        <h1 className="text-5xl font-bold text-gray-800 capitalize mb-2">
          {pokemon.name}
        </h1>
        <p className="text-lg text-gray-600">Pokédex ID: #{pokemon.id}</p>
      </div>
      <div className="lg:w-1/2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-blue-700">Details</h2>
            <p className="text-lg">
              Height:{" "}
              <span className="font-bold">
                {(pokemon.height / 10).toFixed(2)} m
              </span>
            </p>
            <p className="text-lg">
              Weight:{" "}
              <span className="font-bold">
                {(pokemon.weight / 10).toFixed(2)} kg
              </span>
            </p>
            <p className="text-lg">
              Base Experience:{" "}
              <span className="font-bold">{pokemon.base_experience}</span>
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-green-700">Types</h2>
            <ul className="flex flex-wrap mt-2">
              {pokemon.types?.map((type, index) => (
                <li
                  key={index}
                  className="bg-green-500 text-white rounded-full px-4 py-2 m-1"
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-yellow-700">
              Abilities
            </h2>
            <ul className="list-disc ml-6">
              {pokemon.abilities?.map((ability, index) => (
                <li key={index} className="text-lg">
                  • {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-red-700">Stats</h2>
            <ul className="list-disc ml-6">
              {pokemon.stats?.map((stat, index) => (
                <li key={index} className="text-lg">
                  {stat.base_stat}{" "}
                  <span className="text-gray-500">
                    (
                    {index === 0
                      ? "HP"
                      : index === 1
                      ? "Attack"
                      : index === 2
                      ? "Defense"
                      : `Stat ${index + 1}`}
                    )
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
