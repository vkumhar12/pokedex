import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Collection } from "./components/Collection";
import { PokemonDetail } from "./components/PokemonDetail";
// import { PokemonDetail } from "./components/PokemonCards";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Collection />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
