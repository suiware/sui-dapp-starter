import { Transaction } from '@mysten/sui/transactions'
import { fullFunctionName } from '~~/helpers/network'

export const prepareCreateGreetingTransaction = (
  packageId: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [],
    target: fullFunctionName(packageId, 'create'),
  })

  return tx
}

export const prepareSetGreetingTransaction = (
  packageId: string,
  objectId: string,
  name: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [tx.object(objectId), tx.pure.string(name), tx.object('0x8')],
    target: fullFunctionName(packageId, 'set_greeting'),
  })

  return tx
}

export const prepareResetGreetingTransaction = (
  packageId: string,
  objectId: string
): Transaction => {
  const tx = new Transaction()
  tx.moveCall({
    arguments: [tx.object(objectId)],
    target: fullFunctionName(packageId, 'reset_greeting'),
  })

  return tx
}
