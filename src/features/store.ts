import { configureStore } from "@reduxjs/toolkit";
import pokemonCollectionReducer from "./pokemonCollectionSlice";
import pokemonReducer from "./pokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonCollection: pokemonCollectionReducer,
  },
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
