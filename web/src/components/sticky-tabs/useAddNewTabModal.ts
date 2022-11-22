import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppRoute } from 'routes'

type Props = {
  setCurrentTab: (param: string) => void
  prevTab: string
}

export const useAddNewTabModal = ({ prevTab, setCurrentTab }: Props) => {
  const navigate = useNavigate()

  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpened(false)
    navigate(prevTab)
    setCurrentTab(prevTab)
  }

  const handleOpenModal = () => {
    setIsModalOpened(true)
    setCurrentTab(AppRoute.AddTab)
  }

  return { isModalOpened, setIsModalOpened, handleCloseModal, handleOpenModal }
}
