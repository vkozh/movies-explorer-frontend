import { useState, useEffect } from 'react'

export default function useWindowWidth() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleScreenWidth = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleScreenWidth)
    return () => window.removeEventListener('resize', handleScreenWidth)
  }, [])

  return screenWidth;
}
