import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { createRecipesSlice, RecipiesSliceType } from "./recipeSlice"
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice"
import {
  createNotificationsSlice,
  NotificationsSliceType,
} from "./notificationSlice"

export const useAppStore = create<
  RecipiesSliceType & FavoritesSliceType & NotificationsSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationsSlice(...a),
  }))
)
