'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('Loading checkout...')

  useEffect(() => {
    const txn = searchParams.get('_ptxn')
    if (!txn) {
      setStatus('No transaction found.')
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
    script.onload = () => {
      const paddle = (window as any).Paddle
      paddle.Setup({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
      })
      paddle.Checkout.open({
        transactionId: txn,
        settings: {
          displayMode: 'overlay',
          theme: 'dark',
        }
      })
      setStatus('Opening checkout...')
    }
    document.head.appendChild(script)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050a09',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '16px'
    }}>
      {status}
    </div>
  )
}
