import Notification from '@/components/Notification'
import toast, { Renderable } from 'react-hot-toast'

const reportLoading = (message: Renderable) => {
  const content = <Notification type="loading">{message}</Notification>

  return toast.loading(content)
}

const reportError = (
  error: Error | null,
  userFriendlyMessage?: string | null,
  id?: string
) => {
  if (error != null) {
    console.error(error)
  }

  const message =
    userFriendlyMessage || error?.message || 'An error has occurred'

  const content = (
    <Notification type="error" id={id}>
      {message}
    </Notification>
  )

  return toast.error(content, { id })
}

const reportSuccess = (message: Renderable, id?: string) => {
  const content = (
    <Notification type="success" id={id}>
      {message}
    </Notification>
  )

  return toast.success(content, { id, duration: 4000 })
}

const reportTxLoading = () => {
  return reportLoading('Confirm this transaction in your wallet')
}

const reportTxError = (
  error: Error | null,
  userFriendlyMessage?: string | null,
  id?: string
) => {
  return reportError(error, userFriendlyMessage, id)
}

const reportTxSuccess = (transactionUrl: string, id?: string) => {
  return reportSuccess(
    <>
      Transaction submitted <a href={transactionUrl}>(view)</a>
    </>,
    id
  )
}

export const notification = {
  loading: reportLoading,
  success: reportSuccess,
  error: reportError,
  txLoading: reportTxLoading,
  txSuccess: reportTxSuccess,
  txError: reportTxError,
}
