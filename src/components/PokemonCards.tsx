import React from "react";

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience?: number;
  types?: PokemonType[];
  abilities?: PokemonAbility[];
  stats?: PokemonStat[];
  sprites?: {
    other?: {
      dream_world?: {
        front_default?: string;
      };
    };
  };
}

interface PokemonCardsProps {
  pokemonData: PokemonData;
}

export const PokemonCards: React.FC<PokemonCardsProps> = ({ pokemonData }) => {
  return (
    <li className=" bg-white shadow-md cursor-pointer rounded-lg p-4 m-2 hover:shadow-xl transition-shadow duration-300">
      <figure className="flex justify-center mb-4">
        <img
          src={pokemonData.sprites?.other?.dream_world?.front_default || ""}
          alt={pokemonData.name}
          className=" w-24 h-24"
        />
      </figure>
      <h1 className=" text-xl font-bold text-gray-800 text-center mb-2">
        {pokemonData.name}
      </h1>
      <div className=" text-center text-sm text-gray-500 mb-4">
        <p>
          {pokemonData.types?.map((curType) => curType.type.name).join(", ") ||
            "Unknown Type"}
        </p>
      </div>
    </li>
  );
};
