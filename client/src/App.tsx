import { useState } from "react";
import DexEntries from "./components/DexEntries";
import { Pokedex } from "./interfaces";

const App = () => {
  const testDex: Pokedex = {
    entries: [
      { dexNum: 1, name: "Bulbasaur", image: "" },
      { dexNum: 10, name: "Pidgey", image: "" },
    ],
  };

  const [pokedex, setPokedex] = useState<Pokedex>(testDex);

  return (
    <div className="App">
      <DexEntries pokedex={pokedex} />
    </div>
  );
};

export default App;
