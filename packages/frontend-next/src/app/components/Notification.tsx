'use client'

import { Button } from '@radix-ui/themes'
import c from 'clsx'
import { XIcon } from 'lucide-react'
import { FC, PropsWithChildren } from 'react'
import toast, { ToastType } from 'react-hot-toast'

interface INotification {
  id?: string
  type: ToastType
}
const Notification: FC<PropsWithChildren<INotification>> = ({
  children,
  id,
  type,
}) => {
  const isCloseButtonVisible = id !== null && type !== 'loading'

  return (
    <div className="flex w-full flex-row items-center justify-between gap-2">
      <div
        className={c('text-pretty', {
          'mr-2': isCloseButtonVisible,
        })}
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {children}
      </div>
      {isCloseButtonVisible && (
        <Button
          variant="ghost"
          className="-mr-3 cursor-pointer px-1 text-sds-accent-a11"
          onClick={() => toast.dismiss(id)}
        >
          <XIcon />
        </Button>
      )}
    </div>
  )
}

export default Notification
