'use client'

import { useCurrentAccount } from '@mysten/dapp-kit'
import useNetworkType from '@suiware/kit/useNetworkType'
import { isNetworkSupported, supportedNetworks } from '../helpers/network'

const NetworkSupportChecker = () => {
  const { networkType } = useNetworkType()
  const currentAccount = useCurrentAccount()

  const okNetworks = supportedNetworks()

  if (currentAccount == null || okNetworks.length === 0) {
    return <></>
  }

  // @fixme: Find a better type for the networkType.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  if (networkType == null || isNetworkSupported(networkType as any)) {
    return <></>
  }

  return (
    <div className="mx-auto w-full max-w-lg px-3 py-2">
      <div className="w-full rounded border border-red-400 px-3 py-2 text-center text-red-400">
        The <span className="font-bold">{networkType}</span> is not currently
        supported by the app.
        <br />
        Please switch to a supported network [
        <span className="font-bold">{okNetworks.join(', ')}</span>] in your
        wallet settings.
      </div>
    </div>
  )
}

export default NetworkSupportChecker
