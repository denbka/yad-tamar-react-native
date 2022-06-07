import { Portal, PortalProvider } from '@gorhom/portal'
import { Modal } from '@shared-components/modal'
import React, { createContext, FC, ReactNode, useContext, useState } from 'react'

type ModalContext = {
  show: (element: JSX.Element) => void
  hide: () => void
}
type ModalProviderProps = {
  children: ReactNode
}

const context = createContext<ModalContext>({
  show: () => {},
  hide: () => {},
})

export const useModal = () => useContext(context)

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [portal, setPortal] = useState<JSX.Element | null>(null)
  const show = (element: JSX.Element) => {
    setPortal(
      <Portal>
        <Modal>{element}</Modal>
      </Portal>,
    )
  }
  const hide = () => {
    setPortal(null)
  }
  return (
    <context.Provider value={{ show, hide }}>
      <PortalProvider>
        {children}
        {portal}
      </PortalProvider>
    </context.Provider>
  )
}
