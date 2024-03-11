import { useEffect, useState, FC, ReactElement } from 'react'

interface RouterProps {
  path: string
  component: () => ReactElement
}

const Router: FC<RouterProps> = ({ path, component }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('navigate', onLocationChange)
    return () => window.removeEventListener('navigate', onLocationChange)
  }, [])
  return currentPath === path ? component() : null
}

export default Router
