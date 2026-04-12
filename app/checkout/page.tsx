import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: '#050a09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        Loading checkout...
      </div>
    }>
      <CheckoutClient />
    </Suspense>
  )
}
