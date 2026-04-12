'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PaddleCheckout() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const txn = searchParams.get('_ptxn')
    if (!txn) return

    const paddle = (window as any).Paddle
    if (!paddle) return

    paddle.Setup({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
    })

    paddle.Checkout.open({
      transactionId: txn
    })
  }, [searchParams])

  return null
}
