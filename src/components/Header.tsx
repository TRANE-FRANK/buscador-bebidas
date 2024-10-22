import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  })

  const { pathname } = useLocation()

  const isHome = useMemo(() => pathname === "/", [pathname])

  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const categories = useAppStore((state) => state.categories)
  const searchrecipes = useAppStore((state) => state.searchRecipes)
  const showNotification = useAppStore((state) => state.showNotification)

  useEffect(() => {
    fetchCategories()
  }, [])

  const hangleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true,
      })
      return
    }

    //Validación de recetas
    searchrecipes(searchFilters)
  }

  return (
    <header className="bg-slate-600 ">
      <div className="mx-auto container px-5 py-3">
        <div className="flex justify-between items-center">
          <div className=" flex flex-col space-y-4">
            <img
              className="w-16"
              src="https://cdn-icons-png.flaticon.com/256/9449/9449246.png"
              alt="logotipo"
            />
            <span className=" text-white font-extrabold text-3xl">
              Cocteles y Bebidas
            </span>
          </div>
          <nav className="flex gap-10">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold uppercase"
                  : "text-white font-bold uppercase"
              }
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold uppercase"
                  : "text-white font-bold uppercase"
              }
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className="my-10 p-10 md:w-1/2 2xl:w-1/3 bg-blue-200 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                className="block font-extrabold text-lg"
                htmlFor="ingredient"
              >
                Nombre o Ingrediente
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none bg-slate-200"
                placeholder="Nombre o Ingrediente. Ej. Café, Tequila, Vodka"
                onChange={hangleChange}
                value={searchFilters.ingredient}
              />
              <select
                name="category"
                id="category"
                className="p-3 w-full rounded-lg focus:outline-none bg-slate-200"
                onChange={hangleChange}
                value={searchFilters.category}
              >
                <option value="">-- Seleccione --- </option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
              <input
                type="submit"
                value="Buscar Recetas"
                className="cursor-pointer bg-blue-400 transition-colors duration-500 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-600 text-white font-extrabold w-full p-2 rounded-lg uppercase"
              />
            </div>
          </form>
        )}
      </div>
    </header>
  )
}
