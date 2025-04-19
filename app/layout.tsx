'use client'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { http } from 'viem'
import { AuthProvider } from '@/lib/AuthProvider'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const { connectors } = getDefaultWallets({
  appName: 'CryptoCred',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
})

const wagmiConfig = createConfig({
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http()
  },
  connectors,
  ssr: true,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider chains={[polygonMumbai]}>
                {children}
              </RainbowKitProvider>
            </WagmiConfig>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
