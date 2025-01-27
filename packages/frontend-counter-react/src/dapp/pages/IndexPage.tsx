import { FC } from 'react'
import Layout from '~~/components/layout/Layout'
import CreateCounterForm from '~~/dapp/components/CreateCounterForm'
import NetworkSupportChecker from '../../components/NetworkSupportChecker'

const IndexPage: FC = () => {
  return (
    <Layout>
      <NetworkSupportChecker />
      <div className="justify-content flex flex-grow flex-col items-center justify-center rounded-md p-3">
        <CreateCounterForm />
      </div>
    </Layout>
  )
}

export default IndexPage
