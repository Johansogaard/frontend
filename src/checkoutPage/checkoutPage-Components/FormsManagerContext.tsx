/*import React, { useState } from 'react'
//import { formsManager } from '../checkoutPage-Hooks/formsManager'

const FormsManagerContext = React.createContext<FormsManagerState | null>(null)

export function FormsManagerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [vatNumber, setVatNumber] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
  const [isVatNumberValid, setIsVatNumberValid] = useState(false)

  const formsManagerState = {
    email,
    setEmail: (newEmail: string) => {
      localStorage.setItem('email', newEmail)
      setEmail(newEmail)
    },
    phoneNumber,
    setPhoneNumber,
    vatNumber,
    setVatNumber,
    isEmailValid,
    setIsEmailValid,
    isPhoneNumberValid,
    setIsPhoneNumberValid,
    isVatNumberValid,
    setIsVatNumberValid,
  }

  return (
    <FormsManagerContext.Provider value={formsManagerState}>
      {children}
    </FormsManagerContext.Provider>
  )
}

type FormsManagerState = {
  email: string
  setEmail: (email: string) => void
  phoneNumber: string
  setPhoneNumber: (phoneNumber: string) => void
  vatNumber: string
  setVatNumber: (vatNumber: string) => void
  isEmailValid: boolean
  setIsEmailValid: (isValid: boolean) => void
  isPhoneNumberValid: boolean
  setIsPhoneNumberValid: (isValid: boolean) => void
  isVatNumberValid: boolean
  setIsVatNumberValid: (isValid: boolean) => void
}

export function useFormManager(): FormsManagerState {
  const context = React.useContext(FormsManagerContext)
  if (!context) {
    throw new Error('useFormManager must be used within a FormsManagerProvider')
  }
  return context
}
*/