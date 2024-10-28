import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../core/Pagination";
import { SearchAndFilter } from "../core/SearchAndFilter";
import {
  addToCollection,
  removeFromCollection,
} from "../features/pokemonCollectionSlice";
import { fetchPokemon } from "../features/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import "../index.css";
import { PokemonCards } from "./PokemonCards";

export const Collection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>("A-Z");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [allTypes, setAllTypes] = useState<string[]>([]);

  const { pokemon, loading, error } = useAppSelector((state) => state.pokemon);
  const collection = useAppSelector(
    (state) => state.pokemonCollection.collection
  );

  useEffect(() => {
    dispatch(fetchPokemon(page));
    fetchPokemonTypes();
  }, [dispatch, page]);

  const fetchPokemonTypes = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();
      const types = data.results.map((type: { name: string }) => type.name);
      setAllTypes(types);
    } catch (error) {
      console.log("Error fetching Pokémon types:", error);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCaptureToggle = (curPokemon: any) => {
    if (collection.some((pokemon) => pokemon.id === curPokemon.id)) {
      dispatch(removeFromCollection(curPokemon));
    } else {
      dispatch(addToCollection(curPokemon));
    }
  };

  const sortData = (data: any[]) => {
    return data.sort((a, b) => {
      if (sortOrder === "A-Z") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const filterDataByType = (data: any[]) => {
    if (selectedTypes.length === 0) {
      return data;
    }
    return data.filter((curPokemon) => {
      return curPokemon.types.some((typeInfo: any) =>
        selectedTypes.includes(typeInfo.type.name)
      );
    });
  };

  if (loading && pokemon.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  const filteredData = filterDataByType(searchData);
  const sortedData = sortData(filteredData);

  return (
    <section className="container mx-auto px-4">
      <header className="my-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Pokemon List</h1>
      </header>
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        allTypes={allTypes}
      />

      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedData.map((curPokemon) => (
            <li key={curPokemon.id} className="cursor-pointer">
              <div
                className="rounded-lg p-4"
                onClick={() => handleCardClick(curPokemon.id)}
              >
                <PokemonCards pokemonData={curPokemon} />
              </div>
              <div className="pl-6">
                <button
                  onClick={() => handleCaptureToggle(curPokemon)}
                  className={`mt-4 px-4 py-2 font-semibold rounded-lg ${
                    collection.some((pokemon) => pokemon.id === curPokemon.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } transition-colors`}
                >
                  {collection.some((pokemon) => pokemon.id === curPokemon.id)
                    ? "Release"
                    : "Capture"}
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(sortedData.length)}
        />
      </div>
    </section>
  );
};
