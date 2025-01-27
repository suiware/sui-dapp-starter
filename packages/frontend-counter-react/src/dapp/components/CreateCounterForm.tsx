import { useCurrentAccount } from '@mysten/dapp-kit'
import { SuiTransactionBlockResponse } from '@mysten/sui/client'
import { SuiSignAndExecuteTransactionOutput } from '@mysten/wallet-standard'
import { Button } from '@radix-ui/themes'
import useTransact from '@suiware/kit/useTransact'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import CustomConnectButton from '~~/components/CustomConnectButton'
import {
  CONTRACT_PACKAGE_VARIABLE_NAME,
  EXPLORER_URL_VARIABLE_NAME,
} from '~~/config/network'
import { prepareCreateCounterTransaction } from '~~/dapp/helpers/transactions'
import { transactionUrl } from '~~/helpers/network'
import { notification } from '~~/helpers/notification'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

const CreateCounterForm = () => {
  const currentAccount = useCurrentAccount()
  const { useNetworkVariable } = useNetworkConfig()
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)
  const [notificationId, setNotificationId] = useState<string>()
  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)
  const navigate = useNavigate()

  const { transact: create } = useTransact({
    onBeforeStart: () => {
      const nId = notification.txLoading()
      setNotificationId(nId)
    },
    onSuccess: (
      data: SuiSignAndExecuteTransactionOutput,
      response: SuiTransactionBlockResponse
    ) => {
      notification.txSuccess(
        transactionUrl(explorerUrl, data.digest),
        notificationId
      )

      const counterId = response.effects?.created?.[0]?.reference?.objectId
      navigate(`/counter/${counterId}`)
    },
    onError: (e: Error) => {
      notification.txError(e, null, notificationId)
    },
    waitForTransactionOptions: {
      showEffects: true,
    },
  })

  const handleCreateCounterClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    create(prepareCreateCounterTransaction(packageId))
  }

  if (currentAccount == null) return <CustomConnectButton />

  return (
    <div className="my-2 flex flex-grow flex-col items-center justify-center">
      <div className="flex flex-col">
        <Button variant="solid" size="4" onClick={handleCreateCounterClick}>
          Create Counter
        </Button>
      </div>
    </div>
  )
}

export default CreateCounterForm
