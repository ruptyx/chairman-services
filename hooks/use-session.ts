// hooks/useSessionActivity.ts
'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/client'

interface UseSessionActivityOptions {
  timeoutMs?: number // Default: 5 minutes
  onTimeout?: () => void
  enabled?: boolean
}

export function useSessionActivity({
  timeoutMs = 5 * 60 * 1000, // 5 minutes
  onTimeout,
  enabled = true
}: UseSessionActivityOptions = {}) {
  const supabase = createClient()
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())
  const [hasSession, setHasSession] = useState(false)

  const handleSignOut = useCallback(async () => {
    try {
      // Check if there's an active session before signing out
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        console.log('No active session to sign out')
        return
      }
      
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
      } else {
        // Call custom callback if provided
        onTimeout?.()
        
        // Redirect to login page
        router.push('/auth/login')
        router.refresh()
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err)
    }
  }, [supabase, router, onTimeout])

  const resetTimer = useCallback(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Update last activity timestamp
    lastActivityRef.current = Date.now()

    // Set new timeout
    if (enabled) {
      timeoutRef.current = setTimeout(() => {
        handleSignOut()
      }, timeoutMs)
    }
  }, [timeoutMs, handleSignOut, enabled])

  const trackActivity = useCallback(() => {
    // Throttle activity tracking to avoid excessive timer resets
    const now = Date.now()
    const timeSinceLastActivity = now - lastActivityRef.current
    
    // Only reset if more than 1 second has passed since last activity
    if (timeSinceLastActivity > 1000) {
      resetTimer()
    }
  }, [resetTimer])

  // Check for active session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setHasSession(!!session)
    }
    
    checkSession()
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setHasSession(!!session)
      
      // Clear timeout if session ends
      if (!session && timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    if (!enabled || !hasSession) return

    // Events to track
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'keydown',
      'focus'
    ]

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, trackActivity, true)
    })

    // Start the timer
    resetTimer()

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, trackActivity, true)
      })
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [trackActivity, resetTimer, enabled])

  // Also track visibility changes
  useEffect(() => {
    if (!enabled) return

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // User returned to the tab
        resetTimer()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [resetTimer, enabled])

  return {
    resetTimer,
    trackActivity
  }
}