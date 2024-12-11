import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import type { SuiSignAndExecuteTransactionOutput } from '@mysten/wallet-standard'
import { EXPLORER_URL_VARIABLE_NAME } from '~~/config/networks'
import { transactionUrl } from '~~/helpers/networks'
import { notification } from '~~/helpers/notification'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

export interface IUseTransactParams {
  /**
   * (Optional) React on success, e.g. refetch dependent queries.
   *
   * @param {SuiSignAndExecuteTransactionOutput} data The transaction output.
   */
  onSuccess?: (data: SuiSignAndExecuteTransactionOutput) => void
  /**
   * (Optional) React on error.
   *
   * @param {Error} e The error.
   */
  onError?: (e: Error) => void
}

export interface IUseTransactResponse {
  /**
   * Perform a transaction on the Sui network.
   *
   * @param {Transaction} tx The transaction to perform.
   */
  transact: (tx: Transaction) => void
}

/**
 * The useTransact() hook lets you perform a transaction on the Sui network.
 *
 * When user triggers a transaction, we display a notification to confirm that transaction in their wallet.
 * Once user confirmed or rejected the transaction, we convert that notification to a success message or error message.
 * The success message will have a link to a Sui Explorer depending on the active network.
 * In case of error, we additionally print full error message in the browser console.
 *
 * Usage:
 * ```ts
 * import type { SuiSignAndExecuteTransactionOutput } from '@mysten/wallet-standard'
 * import { Transaction } from '@mysten/sui/transactions'
 * const { transact: greet } = useTransact({
 *   onSuccess: (data: SuiSignAndExecuteTransactionOutput) => {},
 *   onError: (e: Error) => {}
 * })
 *
 * const prepareTransaction = (packageId: string, objectId: string, name: string) => {
 *   const tx = new Transaction()
 *   tx.moveCall({
 *     arguments: [tx.object(objectId), tx.pure.string(name), tx.object('0x8')],
 *     target: `${packageId}::greeting::set_greeting`,
 *   })
 *   return tx
 * }
 *
 * greet(prepareTransaction(packageId, objectId, name))
 * ```
 *
 * @param {IUseTransactParams} The hook params.
 * @returns {IUseTransactResponse} An object with the transact function.
 */
const useTransact = ({
  onSuccess,
  onError,
}: IUseTransactParams = {}): IUseTransactResponse => {
  const client = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const { useNetworkVariable } = useNetworkConfig()
  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)

  const transact = (tx: Transaction) => {
    const notificationId = notification.txLoading()

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onError: (e: Error) => {
          notification.txError(e, null, notificationId)
          if (onError != null) {
            onError(e)
          }
        },
        onSuccess: (data: SuiSignAndExecuteTransactionOutput) => {
          client
            .waitForTransaction({
              digest: data.digest,
            })
            .then(() => {
              notification.txSuccess(
                transactionUrl(explorerUrl, data.digest),
                notificationId
              )
              if (onSuccess != null) {
                onSuccess(data)
              }
            })
        },
      }
    )
  }

  return { transact }
}

export default useTransact
