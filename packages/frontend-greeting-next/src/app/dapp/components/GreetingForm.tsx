'use client'

import { useCurrentAccount } from '@mysten/dapp-kit'
import { SuiSignAndExecuteTransactionOutput } from '@mysten/wallet-standard'
import { Button, TextField } from '@radix-ui/themes'
import useTransact from '@suiware/kit/useTransact'
import Image from 'next/image'
import { ChangeEvent, FC, MouseEvent, PropsWithChildren, useState } from 'react'
import CustomConnectButton from '~~/components/CustomConnectButton'
import Loading from '~~/components/Loading'
import {
  CONTRACT_PACKAGE_VARIABLE_NAME,
  EXPLORER_URL_VARIABLE_NAME,
} from '~~/config/network'
import AnimalEmoji from '~~/dapp/components/Emoji'
import {
  prepareCreateGreetingTransaction,
  prepareResetGreetingTransaction,
  prepareSetGreetingTransaction,
} from '~~/dapp/helpers/transactions'
import useOwnGreeting from '~~/dapp/hooks/useOwnGreeting'
import {
  getResponseContentField,
  getResponseDisplayField,
  getResponseObjectId,
  transactionUrl,
} from '~~/helpers/network'
import { notification } from '~~/helpers/notification'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

const GreetingForm = () => {
  const [name, setName] = useState<string>('')
  const currentAccount = useCurrentAccount()
  const { data, isPending, error, refetch } = useOwnGreeting()
  const { useNetworkVariable } = useNetworkConfig()
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)
  const [notificationId, setNotificationId] = useState<string>()
  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)

  const { transact: create } = useTransact({
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
  const { transact: greet } = useTransact({
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
  const { transact: reset } = useTransact({
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

  const handleCreateGreetingClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    create(prepareCreateGreetingTransaction(packageId))
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleGreetMe = (objectId: string | null | undefined) => {
    if (objectId == null) {
      notification.error(null, 'Object ID is not valid')
      return
    }

    if (name.trim().length === 0) {
      notification.error(null, 'Name cannot be empty')
      return
    }

    greet(prepareSetGreetingTransaction(packageId, objectId, name))
  }

  const handleReset = (objectId: string | null | undefined) => {
    if (objectId == null) {
      notification.error(null, 'Object ID is not valid')
      return
    }

    reset(prepareResetGreetingTransaction(packageId, objectId))
  }

  if (currentAccount == null) return <CustomConnectButton />

  if (isPending) return <Loading />

  // @todo: Handle the following errors with toasts.
  if (error) return <TextMessage>Error: {error.message}</TextMessage>

  if (!data.data) return <TextMessage>Not found</TextMessage>

  return (
    <div className="my-2 flex flex-grow flex-col items-center justify-center">
      {data.data.length === 0 ? (
        <div className="flex flex-col">
          <Button variant="solid" size="4" onClick={handleCreateGreetingClick}>
            Get Started
          </Button>
        </div>
      ) : (
        <div>
          {getResponseContentField(data.data[0], 'name')?.length !== 0 ? (
            <div className="flex w-full max-w-xs flex-col gap-6 px-2 sm:max-w-lg">
              <h1 className="bg-gradient-to-r from-sds-blue to-sds-pink bg-clip-text text-center text-4xl font-bold !leading-tight text-transparent sm:text-5xl">
                Greetings from{' '}
                <AnimalEmoji
                  index={Number(getResponseContentField(data.data[0], 'emoji'))}
                />
                , {getResponseContentField(data.data[0], 'name')}!
              </h1>

              <div className="my-3 flex flex-col items-center justify-center">
                <h2 className="bg-gradient-to-r from-sds-pink to-sds-blue bg-clip-text text-center text-2xl font-bold !leading-tight text-transparent sm:text-3xl">
                  You&apos;ve got a new NFT
                </h2>

                <Image
                  width={372}
                  height={372}
                  className="mt-3 w-3/4 rounded-md border border-sds-blue p-5"
                  src={getResponseDisplayField(data.data[0], 'image_url') || ''}
                  alt="Greeting NFT Image"
                />
              </div>

              <Button
                className="mx-auto"
                variant="solid"
                size="4"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  handleReset(getResponseObjectId(data.data[0]))
                }}
              >
                Start over
              </Button>
            </div>
          ) : (
            <div className="flex w-full max-w-xs flex-col gap-6 px-2 sm:max-w-lg">
              <TextField.Root
                size="3"
                placeholder="Enter your name..."
                onChange={handleNameChange}
                required
              />
              <Button
                variant="solid"
                size="4"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  handleGreetMe(getResponseObjectId(data.data[0]))
                }}
              >
                Greet me!
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GreetingForm

const TextMessage: FC<PropsWithChildren> = ({ children }) => (
  <div className="text-center">{children}</div>
)
