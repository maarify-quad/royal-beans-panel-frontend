import React, { useEffect } from "react";

// Services
import { useGetProfileQuery } from "@services/authApi";

// Redux
import { useReduxDispatch } from "@app/hook";
import { setUser, setAuthenticated } from "@slices/authSlice";

// UI Utils
import { showNotification } from "@mantine/notifications";

// Icons
import { AlertTriangle as AlertTriangleIcon } from "tabler-icons-react";

// Components
import { LoadingScreen } from "@components/LoadingScreen";

// Props
type AuthInitialiserProps = {
  children: React.ReactNode;
};

export const AuthInitialiser: React.FC<AuthInitialiserProps> = ({ children }) => {
  const dispatch = useReduxDispatch();
  const { data, isLoading, error } = useGetProfileQuery();

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
      dispatch(setAuthenticated(true));
    }
  }, [data?.user]);

  useEffect(() => {
    if ((error as any)?.message && (error as any)?.message === "tokenExpired") {
      showNotification({
        title: "Oturumunuz sona erdi",
        message: "Lütfen tekrar giriş yapın",
        color: "orange",
        icon: <AlertTriangleIcon />,
      });
    }
  }, [(error as any)?.message]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
