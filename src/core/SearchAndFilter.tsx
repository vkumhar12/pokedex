// SearchAndFilter.tsx
import React from "react";

interface SearchAndFilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  allTypes: string[];
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  search,
  setSearch,
  sortOrder,
  setSortOrder,
  selectedTypes,
  setSelectedTypes,
  allTypes,
}) => (
  <div className="flex justify-between mb-8 pl-7">
    <input
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="appearance-none border-b-2 border-gray-900 bg-white rounded-t-lg p-2 w-80 text-lg focus:outline-none text-gray-800"
    />
    <div className="flex gap-5">
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="A-Z">Sort A-Z</option>
        <option value="Z-A">Sort Z-A</option>
      </select>
      <select
        value={selectedTypes.length > 0 ? selectedTypes[0] : ""}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedTypes(value === "" ? [] : [value]);
        }}
        className="p-2 border rounded"
      >
        <option value="">All Types</option>
        {allTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  </div>
);
