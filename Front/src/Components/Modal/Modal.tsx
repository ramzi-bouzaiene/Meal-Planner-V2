import { ReactNode } from 'react'
import { Modal, Button } from 'antd'

interface Props {
  title: string
  openModal: boolean
  handleOk?: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleModal?: () => void
  children: ReactNode
  okText?: string
  cancelText?: string
  okDanger?: boolean
}

export const CustomModal = ({
  title,
  openModal,
  handleOk,
  handleModal,
  children,
  okText = 'Confirm',
  cancelText = 'Cancel',
  okDanger = false,
}: Props) => {
  return (
    <Modal
      title={title}
      open={openModal}
      onOk={handleOk}
      onCancel={handleModal}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{
        danger: okDanger,
        style: okDanger ? {} : {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          border: 'none'
        }
      }}
      cancelButtonProps={{
        style: { borderRadius: '6px' }
      }}
      styles={{
        header: {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          padding: '20px 24px',
          marginBottom: 0,
          borderRadius: '16px 16px 0 0',
        },
        body: {
          padding: '24px',
        },
        footer: {
          padding: '16px 24px',
          borderTop: '1px solid #e2e8f0',
        }
      }}
    >
      {children}
    </Modal>
  )
}
