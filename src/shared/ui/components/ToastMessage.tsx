import { ToastProvider, useToasts } from "react-toast-notifications";

export const ToastMessage = ({ message, type }: any) => {
  const { addToast } = useToasts();

  return addToast(message, { appearance: type });
};
