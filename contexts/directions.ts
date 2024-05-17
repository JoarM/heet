import { create } from 'zustand'

type State = {
  origin?: {
    lat: number,
    lng: number
  },
  destination?: {
    lat: number,
    lng: number
  }
}

type Action = {
  updateDirections: (location?: State) => void
}

// Create your store, which includes both state and (optionally) actions
export const useDestinationStore = create<State & Action>((set) => ({
  origin: undefined,
  destination: undefined,
  updateDirections: (location) => set(() => (location ? { origin: location.origin, destination: location.destination } : { origin: undefined, destination: undefined })) 
}))
