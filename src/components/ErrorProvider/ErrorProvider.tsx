import React, { useEffect } from "react";

// Reudx
import { useReduxDispatch, useReduxSelector } from "@app/hook";
import { clearErrors, selectError } from "@slices/errorSlice";

// UI Utils
import { showNotification } from "@mantine/notifications";

// Icons
import { X as ErrorIcon } from "tabler-icons-react";

// Props
type ErrorProviderProps = {
  children: React.ReactNode;
};

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const dispatch = useReduxDispatch();
  const error = useReduxSelector(selectError);

  useEffect(() => {
    if (error.message) {
      showNotification({
        title: "Hata",
        message: error.message,
        icon: <ErrorIcon />,
        color: "red",
      });
      dispatch(clearErrors());
    }
  }, [error.id]);

  return <>{children}</>;
};
