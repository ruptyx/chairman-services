// hooks/useSessionActivityWithWarning.ts
'use client'

import { useSessionActivity } from '@/hooks/use-session'
import { createClient } from '@/lib/client'
import { useState, useEffect, useCallback } from 'react'

interface UseSessionActivityWithWarningOptions {
  timeoutMs?: number
  warningMs?: number // Show warning X ms before timeout
}

export function useSessionActivityWithWarning({
  timeoutMs = 5 * 60 * 1000, // 5 minutes
  warningMs = 60 * 1000, // Show warning 1 minute before timeout
}: UseSessionActivityWithWarningOptions = {}) {
  const [showWarning, setShowWarning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [hasSession, setHasSession] = useState(false)
  const supabase = createClient()
  
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
      
      // Reset warning if session ends
      if (!session) {
        setShowWarning(false)
        setTimeRemaining(null)
      }
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])
  
  const { resetTimer } = useSessionActivity({
    timeoutMs,
    enabled: hasSession // Only enable if there's a session
  })

  useEffect(() => {
    // Don't set up timers if no session
    if (!hasSession) return
    
    let warningTimeout: NodeJS.Timeout
    let countdownInterval: NodeJS.Timeout

    const startWarningTimer = () => {
      // Clear any existing timers
      if (warningTimeout) clearTimeout(warningTimeout)
      if (countdownInterval) clearInterval(countdownInterval)
      
      setShowWarning(false)
      setTimeRemaining(null)

      // Set warning timeout
      warningTimeout = setTimeout(() => {
        setShowWarning(true)
        setTimeRemaining(Math.floor(warningMs / 1000))
        
        // Start countdown
        countdownInterval = setInterval(() => {
          setTimeRemaining(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(countdownInterval)
              return null
            }
            return prev - 1
          })
        }, 1000)
      }, timeoutMs - warningMs)
    }

    // Track activity and reset warning timer
    const events = ['mousedown', 'keypress', 'scroll', 'touchstart', 'click']
    const handleActivity = () => {
      startWarningTimer()
      if (showWarning) {
        setShowWarning(false)
        resetTimer()
      }
    }

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    startWarningTimer()

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
      if (warningTimeout) clearTimeout(warningTimeout)
      if (countdownInterval) clearInterval(countdownInterval)
    }
  }, [timeoutMs, warningMs, resetTimer, showWarning, hasSession])

  const extendSession = useCallback(() => {
    setShowWarning(false)
    setTimeRemaining(null)
    resetTimer()
  }, [resetTimer])

  return {
    showWarning: hasSession && showWarning, // Only show warning if there's a session
    timeRemaining,
    extendSession
  }
}