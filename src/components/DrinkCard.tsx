import type { Drink } from "../types"
import { useAppStore } from "../store/useAppStore"

type DrinkCardProps = {
  drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  const selectRecipe = useAppStore((state) => state.selectRecipe)
  return (
    <div className=" border shadow-lg">
      <div className="overflow-hidden">
        <img
          className="hover:scale-125 transition-transform duration-500 hover:rotate-2"
          src={drink.strDrinkThumb}
          alt={`imagen de ${drink.strDrink}`}
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          Ver Receta...
        </button>
      </div>
    </div>
  )
}
