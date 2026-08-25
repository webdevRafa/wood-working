import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { auth, firebaseReady } from '../lib/firebase'

type AuthContextValue = {
  user: User | null
  pending: boolean
  available: boolean
  error: string | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [pending, setPending] = useState(Boolean(auth))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser)
        setPending(false)
      },
      () => {
        setError('We could not restore your sign-in. Please try again.')
        setPending(false)
      },
    )
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      pending,
      available: firebaseReady && Boolean(auth),
      error,
      signInWithGoogle: async () => {
        if (!auth) {
          setError('Firebase is not configured in this environment.')
          return
        }
        setError(null)
        try {
          await signInWithPopup(auth, new GoogleAuthProvider())
        } catch (signInError) {
          const code = typeof signInError === 'object' && signInError && 'code' in signInError ? String(signInError.code) : ''
          if (!code.includes('popup-closed-by-user') && !code.includes('cancelled-popup-request')) {
            setError('Google sign-in did not complete. Confirm the provider and authorized domain in Firebase, then try again.')
          }
        }
      },
      signOut: async () => {
        if (auth) await firebaseSignOut(auth)
      },
    }),
    [error, pending, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Context hooks intentionally live beside their provider so the contract cannot drift.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
