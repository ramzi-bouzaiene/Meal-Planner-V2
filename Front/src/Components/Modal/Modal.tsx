import { ReactNode } from 'react'
import { Modal } from 'antd'

interface Props {
  title: string
  openModal: boolean
  handleOk?: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleModal?: () => void
  children: ReactNode
}

export const CustomModal = ({
  title,
  openModal,
  handleOk,
  handleModal,
  children,
}: Props) => {
  return (
    <>
      <Modal
        title={title}
        open={openModal}
        onOk={handleOk}
        onCancel={handleModal}
      >
        <main>{children}</main>
      </Modal>
    </>
  )
}
