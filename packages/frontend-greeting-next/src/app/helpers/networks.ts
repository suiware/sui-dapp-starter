import { CONTRACT_PACKAGE_ID_NOT_DEFINED } from '../config/networks'
import { ENetwork } from '../types/ENetwork'

export const transactionUrl = (baseExplorerUrl: string, txDigest: string) => {
  return `${baseExplorerUrl}/txblock/${txDigest}`
}
export const packageUrl = (baseExplorerUrl: string, packageId: string) => {
  // Local explorer doesn't have a package view, so we stick with object view instead.
  const subpath =
    baseExplorerUrl.search('localhost') === -1 ? 'package' : 'object'

  return `${baseExplorerUrl}/${subpath}/${packageId}`
}

export const formatNetworkType = (machineName: string) => {
  if (machineName.startsWith('sui:')) {
    return machineName.substring(4)
  }
  return machineName
}

export const supportedNetworks = () => {
  const keys = Object.keys(ENetwork)

  return (
    keys
      .filter(
        (key: string) =>
          process.env[`NEXT_PUBLIC_${key.toUpperCase()}_CONTRACT_PACKAGE_ID`] !=
            null &&
          process.env[
            `NEXT_PUBLIC_${key.toUpperCase()}_CONTRACT_PACKAGE_ID`
          ] !== CONTRACT_PACKAGE_ID_NOT_DEFINED
      )
      // @ts-expect-error Hard to type cast string->ENetwork here.
      .map((key: string) => ENetwork[key as ENetwork])
  )
}

export const isNetworkSupported = (network: ENetwork | undefined) => {
  return supportedNetworks().includes(network)
}
