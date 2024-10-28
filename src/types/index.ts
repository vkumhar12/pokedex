// src/types.ts

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
}

export interface PokemonSprites {
  other?: {
    dream_world?: {
      front_default?: string;
    };
  };
}

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience?: number;
  types?: PokemonType[];
  abilities?: PokemonAbility[];
  stats?: PokemonStat[];
  sprites?: PokemonSprites;
}
