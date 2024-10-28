// features/pokemonCollectionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pokemon {
  id: number;
  name: string;
  // Add other relevant fields here, e.g. type, abilities, etc.
}

interface PokemonCollectionState {
  collection: Pokemon[];
}

const initialState: PokemonCollectionState = {
  collection: [],
};

const pokemonCollectionSlice = createSlice({
  name: "pokemonCollection",
  initialState,
  reducers: {
    addToCollection: (state, action: PayloadAction<Pokemon>) => {
      state.collection.push(action.payload);
    },
    removeFromCollection: (state, action: PayloadAction<Pokemon>) => {
      state.collection = state.collection.filter(
        (pokemon) => pokemon.id !== action.payload.id
      );
    },
  },
});

export const { addToCollection, removeFromCollection } =
  pokemonCollectionSlice.actions;
export default pokemonCollectionSlice.reducer;
