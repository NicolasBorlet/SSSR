import { ToastProvider, useToasts } from "react-toast-notifications";

export const ToastMessage = ({ message }: any) => {
  const { addToast } = useToasts();

  return addToast(message);
};
