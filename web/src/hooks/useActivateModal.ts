import { useState } from "react";

export function useActivateModal<TModalEnum, TModalData = unknown>(
  initialId?: TModalEnum
) {
  const [openedId, setOpenedId] = useState<TModalEnum | null>(
    initialId ?? null
  );
  const [innerData, setInnerData] = useState<TModalData | null>(null);

  return {
    activateModal: setOpenedId,
    isActivatedModal: (id: TModalEnum) => openedId === id,
    deactivateModal: () => setOpenedId(null),

    modalData: innerData,
    saveModalData: setInnerData,
    resetModalData: () => setInnerData(null),
  };
}
