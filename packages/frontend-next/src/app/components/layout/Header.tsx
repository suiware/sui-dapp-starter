'use client'

import { ConnectButton } from '@mysten/dapp-kit'
import { Link } from '@radix-ui/themes'
import Balance from '@suiware/kit/Balance'
import NetworkType from '@suiware/kit/NetworkType'
import { APP_NAME } from '../../config/main'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-white/60 dark:border-slate-50/1 sticky top-0 z-40 flex w-full flex-row flex-wrap items-center justify-center gap-4 bg-white/95 px-3 py-3 backdrop-blur transition-colors duration-500 sm:justify-between sm:gap-3 lg:z-50 lg:border-b lg:border-slate-900/10 dark:bg-transparent">
      <Link
        href="#"
        className="flex flex-col items-center justify-center gap-1 text-sds-dark outline-none hover:no-underline sm:flex-row dark:text-sds-light"
      >
        <Image
          width={40}
          height={40}
          src={Logo}
          alt="Logo"
          className="h-12 w-12"
        />
        <div className="pt-1 text-xl sm:text-2xl">{APP_NAME}</div>
      </Link>

      <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
        <div className="flex flex-row items-center justify-center gap-3">
          <Balance />
          <NetworkType />
        </div>

        {/* @todo: Find a better way to style ConnectButton for example through className, which is currently not supported. */}
        {/* className="[&>button]:!px-4 [&>button]:!py-2 [&>div]:!text-base" */}
        <div className="sds-connect-button-container">
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
export default Header
