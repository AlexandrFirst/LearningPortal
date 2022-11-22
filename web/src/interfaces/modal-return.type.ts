import { useActivateModal } from "../hooks/useActivateModal";

export type ModalReturnType<TModal, TData = unknown> = ReturnType<
  typeof useActivateModal<TModal, TData>
>;
