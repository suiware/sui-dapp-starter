'use client'

import '@mysten/dapp-kit/dist/index.css'
import '@radix-ui/themes/styles.css'
import '@suiware/kit/main.css'
import SuiProvider from '@suiware/kit/SuiProvider'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import useNetworkConfig from '~~/hooks/useNetworkConfig'
import { APP_NAME } from '../config/main'
import { getThemeSettings } from '../helpers/theme'
import { ENetwork } from '../types/ENetwork'
import ThemeProvider from './ThemeProvider'

const themeSettings = getThemeSettings()

export default function ClientProviders({ children }: { children: ReactNode }) {
  const { networkConfig } = useNetworkConfig()

  return (
    <NextThemeProvider attribute="class">
      <ThemeProvider>
        <SuiProvider
          customNetworkConfig={networkConfig}
          defaultNetwork={ENetwork.LOCALNET}
          walletAutoConnect={false}
          walletStashedName={APP_NAME}
          themeSettings={themeSettings}
        >
          {children}
        </SuiProvider>
      </ThemeProvider>
    </NextThemeProvider>
  )
}
