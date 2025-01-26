import { FC, PropsWithChildren } from 'react'

const Body: FC<PropsWithChildren> = ({ children }) => {
  return <main className="flex flex-grow flex-col py-8">{children}</main>
}
export default Body
