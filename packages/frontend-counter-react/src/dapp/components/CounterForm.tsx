import { useCurrentAccount } from '@mysten/dapp-kit'
import { isValidSuiObjectId } from '@mysten/sui/utils'
import { SuiSignAndExecuteTransactionOutput } from '@mysten/wallet-standard'
import { Button } from '@radix-ui/themes'
import useTransact from '@suiware/kit/useTransact'
import { FC, MouseEvent, PropsWithChildren, useState } from 'react'
import { useParams } from 'react-router'
import CustomConnectButton from '~~/components/CustomConnectButton'
import Loading from '~~/components/Loading'
import {
  CONTRACT_PACKAGE_VARIABLE_NAME,
  EXPLORER_URL_VARIABLE_NAME,
} from '~~/config/network'
import {
  prepareDecrementCounterTransaction,
  prepareIncrementCounterTransaction,
} from '~~/dapp/helpers/transactions'
import useCounter from '~~/dapp/hooks/useCounter'
import { getResponseContentField, transactionUrl } from '~~/helpers/network'
import { notification } from '~~/helpers/notification'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

const CounterForm: FC<{counterId: string}> = ({ counterId }) => {
  const currentAccount = useCurrentAccount()
  const { useNetworkVariable } = useNetworkConfig()
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)
  const [notificationId, setNotificationId] = useState<string>()
  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)

  const { data, isPending, error, refetch } = useCounter(counterId)

  const { transact: increment } = useTransact({
    onBeforeStart: () => {
      const nId = notification.txLoading()
      setNotificationId(nId)
    },
    onSuccess: (data: SuiSignAndExecuteTransactionOutput) => {
      notification.txSuccess(
        transactionUrl(explorerUrl, data.digest),
        notificationId
      )
      refetch()
    },
    onError: (e: Error) => {
      notification.txError(e, null, notificationId)
    },
  })
  const { transact: decrement } = useTransact({
    onBeforeStart: () => {
      const nId = notification.txLoading()
      setNotificationId(nId)
    },
    onSuccess: (data: SuiSignAndExecuteTransactionOutput) => {
      notification.txSuccess(
        transactionUrl(explorerUrl, data.digest),
        notificationId
      )
      refetch()
    },
    onError: (e: Error) => {
      notification.txError(e, null, notificationId)
    },
  })

  const handleIncrement = (objectId: string | null | undefined) => {
    if (objectId == null) {
      notification.error(null, 'Object ID is not valid')
      return
    }

    increment(prepareIncrementCounterTransaction(packageId, objectId))
  }

  const handleDecrement = (objectId: string | null | undefined) => {
    if (objectId == null) {
      notification.error(null, 'Object ID is not valid')
      return
    }

    decrement(prepareDecrementCounterTransaction(packageId, objectId))
  }

  if (currentAccount == null) return <CustomConnectButton />

  if (isPending) return <Loading />

  // @todo: Handle the following errors with toasts.
  if (error) return <TextMessage>Error: {error.message}</TextMessage>



  if (!data.data) return <TextMessage>Counter not found</TextMessage>

  return (
    <div className="my-2 flex flex-grow flex-col items-center justify-center">
      <div>Counter: {counterId}</div>

      <div>
        <div className="my-2 flex w-full max-w-xs flex-row items-center justify-center gap-6 p-2 sm:max-w-lg">
          <Button
            variant="solid"
            size="4"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              handleDecrement(counterId)
            }}
          >
            -
          </Button>
          <div>{getResponseContentField(data, 'value')}</div>
          <Button
            variant="solid"
            size="4"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              handleIncrement(counterId)
            }}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CounterForm

const TextMessage: FC<PropsWithChildren> = ({ children }) => (
  <div className="text-center">{children}</div>
)
