import '@mysten/dapp-kit/dist/index.css'
import '@radix-ui/themes/styles.css'
import '@suiware/kit/main.css'
import SuiProvider from '@suiware/kit/SuiProvider'
import { StrictMode } from 'react'
import App from '~~/components/App'
import { reactRender } from '~~/helpers/misc.ts'
import ThemeProvider from '~~/providers/ThemeProvider'
import '~~/styles/index.css'
import { darkTheme, lightTheme } from './config/themes'
import useNetworkConfig from './hooks/useNetworkConfig'
import { ENetwork } from './types/ENetwork'

const Main = () => {
  const { networkConfig } = useNetworkConfig()

  return (
    <StrictMode>
      <ThemeProvider>
        <SuiProvider
          customNetworkConfig={networkConfig}
          defaultNetwork={ENetwork.LOCALNET}
          walletAutoConnect={false}
          themeSettings={[
            {
              // Default to light theme.
              variables: lightTheme,
            },
            {
              // React to the color scheme media query.
              mediaQuery: '(prefers-color-scheme: dark)',
              variables: darkTheme,
            },
            {
              // Reacts to the dark class.
              selector: '.dark',
              variables: darkTheme,
            },
          ]}
        >
          <App />
        </SuiProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

reactRender(<Main />)
