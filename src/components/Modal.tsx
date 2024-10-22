import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { Fragment } from "react"
import { useAppStore } from "../store/useAppStore"
import { Recipe } from "../types"

export default function Modal() {
  const modal = useAppStore((state) => state.modal)
  const closeModal = useAppStore((state) => state.closeModal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe)
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
  const favoriteExists = useAppStore((state) => state.favoriteExists)

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = []
    for (let i = 1; i <= 10; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

      if (ingredient && measure) {
        ingredients.push(
          <li className="text-lg font-normal" key={i}>
            {ingredient} - {measure}
          </li>
        )
      }
    }
    return ingredients
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {selectedRecipe.strDrink}
                  </DialogTitle>
                  <img
                    className="mx-auto w-72 rounded-lg"
                    src={selectedRecipe.strDrinkThumb}
                    alt={`imagen de ${selectedRecipe.strDrink}`}
                  />
                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Ingredientes y Cantidades
                  </DialogTitle>
                  {renderIngredients()}
                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Instrucciones
                  </DialogTitle>
                  <p className="text-lg">{selectedRecipe.strInstructions}</p>
                  <div className="flex justify-between mt-5 gap-4">
                    <button
                      type="button"
                      className="bg-blue-400 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-lg uppercase shadow-lg"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>

                    <button
                      type="button"
                      className="bg-slate-500 hover:bg-slate-600 text-white font-bold w-full py-2 px-4 rounded-lg uppercase shadow-lg"
                      onClick={() => {
                        handleClickFavorite(selectedRecipe)
                        closeModal()
                      }}
                    >
                      {favoriteExists(selectedRecipe.idDrink)
                        ? "Eliminar de Favoritos"
                        : "Añadir a Favoritos"}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
