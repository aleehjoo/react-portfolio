import { useContext } from 'react'
import { SpaceContext } from './spaceContext'

export function useSpace() {
  const value = useContext(SpaceContext)
  if (!value) {
    throw new Error('useSpace must be used inside a SpaceProvider')
  }
  return value
}
