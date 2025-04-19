'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const { connectors } = getDefaultWallets({
  appName: 'CryptoCred',
  projectId,
});