import React, { useEffect } from "react";

// Reudx
import { useReduxDispatch, useReduxSelector } from "@app/hook";
import { clearErrors, selectError } from "@slices/errorSlice";

// UI Utils
import { showNotification } from "@mantine/notifications";

// Icons
import { IconX } from "@tabler/icons";

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
        icon: <IconX />,
        color: "red",
      });
      dispatch(clearErrors());
    }
  }, [error.id]);

  return <>{children}</>;
};
