// components/SessionWarningModal.tsx
'use client'

import { useSessionActivityWithWarning } from '@/hooks/use-with-warning'
import { createClient } from '@/lib/client'
import { useEffect, useState } from 'react'

interface SessionWarningModalProps {
  timeoutMs?: number
  warningMs?: number
}

export function SessionWarningModal({ 
  timeoutMs = 5 * 60 * 1000, // 5 minutes
  warningMs = 60 * 1000 // 1 minute warning
}: SessionWarningModalProps) {
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
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])
  
  const { showWarning, timeRemaining, extendSession } = useSessionActivityWithWarning({
    timeoutMs,
    warningMs
  })

  // Don't render if no session or warning not shown
  if (!hasSession || !showWarning) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
          {/* Warning Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Session Expiring Soon
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Your session will expire in{' '}
              <span className="font-semibold text-gray-900">
                {timeRemaining} {timeRemaining === 1 ? 'second' : 'seconds'}
              </span>
              {' '}due to inactivity.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Would you like to continue your session?
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={extendSession}
              className="flex-1 bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Continue Session
            </button>
            <button
              onClick={async () => {
                const { error } = await supabase.auth.signOut()
                if (!error) {
                  window.location.href = '/auth/login'
                }
              }}
              className="flex-1 bg-gray-200 text-gray-900 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}