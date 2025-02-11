'use client'

import { RegionProvider } from '../lib/context/region-context'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RegionProvider>
      {children}
    </RegionProvider>
  )
}
