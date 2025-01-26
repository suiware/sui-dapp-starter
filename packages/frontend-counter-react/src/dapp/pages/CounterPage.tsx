import { isValidSuiObjectId } from '@mysten/sui/utils'
import { FC } from 'react'
import { useParams } from 'react-router'
import Layout from '~~/components/layout/Layout'
import CounterForm from '~~/dapp/components/CounterForm'
import NetworkSupportChecker from '../../components/NetworkSupportChecker'

const CounterPage: FC = () => {
  const { counterId } = useParams()

  if (counterId == null || !isValidSuiObjectId(counterId))
    return <Layout>Counter ID not found</Layout>

  return (
    <Layout>
      <NetworkSupportChecker />
      <div className="justify-content flex flex-grow flex-col items-center justify-center rounded-md p-3">
        <CounterForm counterId={counterId} />
      </div>
    </Layout>
  )
}

export default CounterPage
