import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from './AuthContext'

type SavedState = { uid: string | null; ids: Set<string> }

type SavedGuidesContextValue = {
  savedIds: Set<string>
  isSaved: (guideId: string) => boolean
  toggleSaved: (guideId: string, slug: string, title: string) => Promise<'saved' | 'removed' | 'sign-in-required'>
}

const SavedGuidesContext = createContext<SavedGuidesContextValue | undefined>(undefined)

export function SavedGuidesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, setState] = useState<SavedState>({ uid: null, ids: new Set() })
  const savedIds = useMemo(
    () => (state.uid === (user?.uid ?? null) ? state.ids : new Set<string>()),
    [state, user?.uid],
  )

  useEffect(() => {
    if (!db || !user) return
    let active = true
    void getDocs(collection(db, 'users', user.uid, 'savedGuides')).then((snapshot) => {
      if (active) setState({ uid: user.uid, ids: new Set(snapshot.docs.map((item) => item.id)) })
    })
    return () => {
      active = false
    }
  }, [user])

  const value = useMemo<SavedGuidesContextValue>(
    () => ({
      savedIds,
      isSaved: (guideId) => savedIds.has(guideId),
      toggleSaved: async (guideId, slug, title) => {
        if (!db || !user) return 'sign-in-required'
        const savedRef = doc(db, 'users', user.uid, 'savedGuides', guideId)
        if (savedIds.has(guideId)) {
          await deleteDoc(savedRef)
          setState((current) => ({ uid: user.uid, ids: new Set([...current.ids].filter((id) => id !== guideId)) }))
          return 'removed'
        }
        await setDoc(savedRef, { guideId, slug, title, savedAt: serverTimestamp() })
        setState((current) => ({ uid: user.uid, ids: new Set(current.ids).add(guideId) }))
        return 'saved'
      },
    }),
    [savedIds, user],
  )

  return <SavedGuidesContext.Provider value={value}>{children}</SavedGuidesContext.Provider>
}

// Context hooks intentionally live beside their provider so the contract cannot drift.
// eslint-disable-next-line react-refresh/only-export-components
export function useSavedGuides() {
  const value = useContext(SavedGuidesContext)
  if (!value) throw new Error('useSavedGuides must be used inside SavedGuidesProvider')
  return value
}
