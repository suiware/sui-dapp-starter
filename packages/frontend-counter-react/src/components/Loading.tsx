import { Spinner } from '@radix-ui/themes'
import { FC } from 'react'

const Loading: FC = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Spinner size="3" />
      Loading...
    </div>
  )
}

export default Loading
