'use client'

import { Toaster } from 'react-hot-toast'
import AnimatedBackground from '../AnimatedBackground'

const Extra = () => {
  return (
    <>
      <AnimatedBackground />
      <Toaster
        toastOptions={{
          className:
            'dark:!bg-sds-dark !bg-sds-light !text-sds-dark dark:!text-sds-light w-full md:!max-w-xl !shadow-toast',
          style: {
            maxWidth: 'none',
          },
        }}
      />
    </>
  )
}
export default Extra
