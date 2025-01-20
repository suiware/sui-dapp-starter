'use client'

import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit'
import { Button } from '@radix-ui/themes'

const CustomConnectButton = () => {
  const currentAccount = useCurrentAccount()

  return (
    <ConnectModal
      trigger={
        <Button variant="solid" size="4">
          {currentAccount ? 'Wallet Connected' : 'Connect Wallet'}
        </Button>
      }
    />
  )
}

export default CustomConnectButton
