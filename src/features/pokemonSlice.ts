// src/features/pokemonSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PokemonType {
  type: { name: string };
}

interface PokemonAbility {
  ability: { name: string };
}

interface PokemonStat {
  base_stat: number;
}

interface PokemonSprites {
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

interface PokemonState {
  pokemon: PokemonData[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemon: [],
  loading: true,
  error: null,
};

// Specify return type for fetchPokemon
export const fetchPokemon = createAsyncThunk<PokemonData[], number>(
  "pokemon/fetchPokemon",
  async (page: number) => {
    const limit = 20;
    const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
      (page - 1) * limit
    }`;
    const res = await fetch(API);
    const data = await res.json();

    // Fetch detailed Pokemon data
    const detailedPokemonData = await Promise.all(
      data.results.map(async (curPokemon: { url: string }) => {
        const res = await fetch(curPokemon.url);
        return await res.json();
      })
    );

    // Map detailed data to PokemonData type
    return detailedPokemonData.map((pokemon: any) => ({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      base_experience: pokemon.base_experience,
      types: pokemon.types,
      abilities: pokemon.abilities,
      stats: pokemon.stats,
      sprites: pokemon.sprites,
    }));
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemon = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Pokémon";
      });
  },
});

export default pokemonSlice.reducer;
