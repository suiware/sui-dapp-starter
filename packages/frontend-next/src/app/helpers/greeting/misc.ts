import { SuiObjectResponse } from '@mysten/sui/client'
import { isValidSuiObjectId } from '@mysten/sui/utils'
import { CONTRACT_MODULE_NAME } from '../../config/networks'

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

/**
 * Convert the numeric emoji index to the unicode representation of the corresponding animal emoji.
 *
 * Animal emojis are represented by the range [1F400-1F43F] https://apps.timwhitlock.info/unicode/inspect/hex/1F400-1F43F
 * The corresponding demo Move package chooses a number from the range [1,64] randomly,
 * and we convert it to the corresponding animal emoji.
 *
 * @param index
 * @returns
 */
export const numToAnimalEmoji = (index: number) => {
  const lowestRangeCode = Number('0x1F400')
  const codePoint = lowestRangeCode + (index - 1)
  return String.fromCodePoint(codePoint)
}

const fullModuleName = (packageId: string): `${string}::${string}` => {
  return `${packageId}::${CONTRACT_MODULE_NAME}`
}
