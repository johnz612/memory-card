import { useCallback, useEffect, useMemo, useState } from "react";
import Game from "../models/Game";
import Pokemon from "./Pokemon";
import { shuffle } from "../helpers/helpers";

function Pokemons() {
  const game = useMemo(() => new Game(), []);
  const [pokemons, setPokemons] = useState([]);
  const [picks, setPicks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onSelect = useCallback((id) => {
    console.log(id);
    //   I want to use call game method here
    if (game.isAlreadyPicked(id)) {
      game.endGame();
      setPicks([]);
      return;
    }
    setPicks((s) => [...s, id]);
    game.addPick(id);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      try {
        const results = await Promise.all(
          game.pokemonNames.map(async (pokemon) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            );
            if (!res.ok) throw new Error(`Failed to load ${pokemon}`);
            const { id, name: pokeName, sprites } = await res.json();
            return { id, pokeName, sprites };
          })
        );

        if (isMounted) {
          setPokemons(results);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAll();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <p>Loading Pokémon…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full grid md:grid-cols-[150px_1fr_150px] lg:grid-cols-[250px_1fr_250px] font-press">
      <div
        className="hidden md:block md:bg-[url('/assets/pik-left.jpg')] w-full bg-center 
    bg-cover
    bg-no-repeat"
      ></div>
      <div className="p-7 w-full">
        <div className="w-full flex flex-col items-center  text-2xl md:text-3xl xl:text-4xl p-8 mb-3">
          <p>Score: {game.currentScore}</p>
          <p>Best Score: {game.highestScore}</p>
        </div>

        <ul className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 w-full ">
          {shuffle(pokemons).map((p) => (
            <Pokemon key={p.id} pokemon={p} onSelect={onSelect} />
          ))}
        </ul>
      </div>
      <div
        className=" hidden md:block md:bg-[url('/assets/pik-right.jpg')] w-full bg-center
    bg-cover
    bg-no-repeat"
      ></div>
    </div>
  );
}

export default Pokemons;
