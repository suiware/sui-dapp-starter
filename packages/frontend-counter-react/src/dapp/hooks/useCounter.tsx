import { useSuiClientQuery } from '@mysten/dapp-kit'

const useCounter = (counterId?: string) => {
  return useSuiClientQuery(
    'getObject',
    {
      id: counterId!,
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!counterId,
    }
  )
}

export default useCounter
