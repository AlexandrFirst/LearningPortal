import { useState } from "react";

import { AppRoute } from "routes";

type Props = {
  setCurrentTab: (param: string) => void;
  prevTab: string;
};

export const useAddNewTabModal = ({ prevTab, setCurrentTab }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpened(false);
    setCurrentTab(prevTab);
  };

  const handleOpenModal = () => {
    setIsModalOpened(true);
    setCurrentTab(AppRoute.AddTab);
  };

  return { isModalOpened, setIsModalOpened, handleCloseModal, handleOpenModal };
};
