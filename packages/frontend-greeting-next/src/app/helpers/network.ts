import { SuiObjectResponse } from '@mysten/sui/client'
import { isValidSuiObjectId } from '@mysten/sui/utils'
import { CONTRACT_PACKAGE_ID_NOT_DEFINED } from '~~/config/network'
import { CONTRACT_MODULE_NAME } from '~~/dapp/config/network'
import { ENetwork } from '~~/types/ENetwork'

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

export const fullFunctionName = (
  packageId: string,
  functionName: string
): `${string}::${string}::${string}` => {
  return `${fullModuleName(packageId)}::${functionName}`
}

export const fullStructName = (
  packageId: string,
  structName: string
): `${string}::${string}::${string}` => {
  return `${fullModuleName(packageId)}::${structName}`
}

export const fromBytesToString = (bytes: number[]): string => {
  return new TextDecoder().decode(new Uint8Array(bytes))
}

export const getResponseContentField = (
  response: SuiObjectResponse | null | undefined,
  field: string
) => {
  if (
    response == null ||
    response.data == null ||
    response.data?.content == null
  ) {
    return null
  }

  if (response.data.content?.dataType !== 'moveObject') {
    return null
  }

  // @todo Find a better way to extract fields from SuiParsedData.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const content = response.data.content as any

  if (content.fields == null) {
    return null
  }

  return content.fields[field]
}

export const getResponseDisplayField = (
  response: SuiObjectResponse | null | undefined,
  field: string
) => {
  if (
    response == null ||
    response.data == null ||
    response.data?.display == null
  ) {
    return null
  }

  // @todo Find a better way to extract fields from SuiParsedData.
  const display = response.data.display

  if (display.data == null) {
    return null
  }

  return display.data[field]
}

export const getResponseObjectId = (
  response: SuiObjectResponse | null | undefined
) => {
  if (
    response == null ||
    response.data == null ||
    response.data?.objectId == null
  ) {
    return null
  }

  const objectId = response.data.objectId

  if (!isValidSuiObjectId(objectId)) {
    return null
  }

  return objectId
}

const fullModuleName = (packageId: string): `${string}::${string}` => {
  return `${packageId}::${CONTRACT_MODULE_NAME}`
}
