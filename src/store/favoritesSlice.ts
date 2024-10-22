import { StateCreator } from "zustand"
import { Recipe } from "../types"
import {
  createNotificationsSlice,
  NotificationsSliceType,
} from "./notificationSlice"

export type FavoritesSliceType = {
  favorites: Recipe[]
  handleClickFavorite: (recipe: Recipe) => void
  favoriteExists: (id: Recipe["idDrink"]) => boolean
  loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & NotificationsSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }))
      createNotificationsSlice(set, get, api).showNotification({
        text: "Eliminado de Favoritos",
        error: false,
      })
    } else {
      set({
        favorites: [...get().favorites, recipe],
      })
      createNotificationsSlice(set, get, api).showNotification({
        text: "Agregado a Favoritos",
        error: false,
      })
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites))
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id)
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) })
    }
  },
})
