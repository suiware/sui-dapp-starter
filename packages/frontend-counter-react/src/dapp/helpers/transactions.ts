import { Transaction } from '@mysten/sui/transactions'
import { fullFunctionName } from '~~/helpers/network'

export const prepareCreateCounterTransaction = (
  packageId: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [],
    target: fullFunctionName(packageId, 'create'),
  })

  return tx
}

export const prepareIncrementCounterTransaction = (
  packageId: string,
  objectId: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [tx.object(objectId)],
    target: fullFunctionName(packageId, 'increment'),
  })

  return tx
}

export const prepareDecrementCounterTransaction = (
  packageId: string,
  objectId: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [tx.object(objectId)],
    target: fullFunctionName(packageId, 'decrement'),
  })

  return tx
}
