'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PaddleCheckout() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const txn = searchParams.get('_ptxn')
    if (!txn) return

    let cancelled = false

    function openCheckout() {
      if (cancelled) return
      const paddle = (window as any).Paddle
      if (!paddle) {
        setTimeout(openCheckout, 200)
        return
      }

      paddle.Setup({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
      })

      paddle.Checkout.open({
        transactionId: txn
      })
    }

    openCheckout()

    return () => { cancelled = true }
  }, [searchParams])

  return null
}
