import { ReactNode } from 'react'
import Navbar from '../Navbar/Navbar'
import styles from './Layout.module.css'
interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
