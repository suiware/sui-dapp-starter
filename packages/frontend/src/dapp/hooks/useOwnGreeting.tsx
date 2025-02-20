import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'
import { CONTRACT_PACKAGE_VARIABLE_NAME } from '~~/config/network'
import { fullStructName } from '~~/helpers/network'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

const useOwnGreeting = () => {
  const currentAccount = useCurrentAccount()
  const { useNetworkVariable } = useNetworkConfig()
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)

  return useSuiClientQuery('getOwnedObjects', {
    owner: currentAccount?.address as string,
    limit: 1,
    filter: {
      StructType: fullStructName(packageId, 'Greeting'),
    },
    options: {
      showContent: true,
      showDisplay: true,
    },
  })
}

export default useOwnGreeting
