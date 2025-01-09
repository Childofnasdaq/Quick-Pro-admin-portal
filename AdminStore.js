import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const ADMIN_EMAIL = 'help@childofnasdaqservices.co.za'
const ADMIN_PASSWORD = 'admin@childofnasdaqservices.co.za'

type AdminStore = {
isAdmin: boolean
login: (email: string, password: string) => boolean
logout: () => void
}

export const useAdminStore = create<AdminStore>()(
persist(
  (set) => ({
    isAdmin: false,
    login: (email, password) => {
      const isValid = email === ADMIN_EMAIL && password === ADMIN_PASSWORD
      set({ isAdmin: isValid })
      return isValid
    },
    logout: () => set({ isAdmin: false }),
  }),
  {
    name: 'admin-storage',
  }
)
)
