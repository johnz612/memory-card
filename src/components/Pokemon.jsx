import { useCallback } from "react";

function Pokemon({ pokemon, onSelect }) {
  const {
    id,
    pokeName,
    sprites: { front_default: imageUrl },
  } = pokemon;

  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  return (
    <li
      className="border-2 flex flex-col justify-center items-center shrink-0"
      onClick={() => handleClick(id)}
    >
      <img src={imageUrl} alt={`${pokeName}`} className="h-[150px]" />
      <span className="text-xs md:text-sm xl:text-sm">{pokeName}</span>
    </li>
  );
}

export default Pokemon;
