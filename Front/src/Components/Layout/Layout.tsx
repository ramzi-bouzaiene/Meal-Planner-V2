import { ReactNode } from 'react'
import Navbar from '../Navbar/Navbar'
import styles from './Layout.module.css'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Navbar />
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Layout
