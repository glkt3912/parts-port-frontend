import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title = 'Nextjs' }) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
    </div>
    </>
  )
}