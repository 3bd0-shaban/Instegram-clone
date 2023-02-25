import { useEffect, useRef, useState } from "react";

export function useIntersection(ref) {
  const elementRef = useRef()
  const [isInViewPort, setIsInViewPort] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const isInViewPort = !!entries[0]?.isIntersecting

      setIsInViewPort(isInViewPort)
    })

    observer.observe(elementRef?.current)

    return () => observer.disconnect()
  }, [])

  return { elementRef, isInViewPort }
}
export default useIntersection