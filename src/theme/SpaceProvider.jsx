import { useCallback, useEffect, useMemo, useState } from 'react'
import { SpaceContext } from './spaceContext'

const STORAGE_KEY = 'omori-space'

function readStoredSpace() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'black' ? 'black' : 'white'
  } catch {
    // Private browsing blocks localStorage entirely. White Space is the default.
    return 'white'
  }
}

export function SpaceProvider({ children }) {
  const [space, setSpace] = useState(readStoredSpace)

  useEffect(() => {
    document.documentElement.setAttribute('data-space', space)
    try {
      window.localStorage.setItem(STORAGE_KEY, space)
    } catch {
      // The choice just won't survive a reload.
    }
  }, [space])

  const toggleSpace = useCallback(
    () => setSpace((current) => (current === 'white' ? 'black' : 'white')),
    [],
  )

  const value = useMemo(() => ({ space, toggleSpace }), [space, toggleSpace])

  return <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>
}
