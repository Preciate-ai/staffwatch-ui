import { useCallback, useState } from "react"

export function useRowLoading () {
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())

  const start = useCallback((id: string) => {
    setLoadingIds(prev => {
      if (prev.has(id)) return prev // avoid needless re-renders
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const stop = useCallback((id: string) => {
    setLoadingIds(prev => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  // capture latest set
  const isLoading = useCallback((id: string) => loadingIds.has(id), [loadingIds])

  return { isLoading, start, stop, loadingIds }
}
