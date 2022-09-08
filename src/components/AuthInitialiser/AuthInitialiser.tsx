import React from "react";

// Services
import { useGetProfileQuery } from "@services/authApi";

// Components
import { LoadingScreen } from "@components/LoadingScreen";

// Props
type AuthInitialiserProps = {
  children: React.ReactNode;
};

export const AuthInitialiser: React.FC<AuthInitialiserProps> = ({ children }) => {
  const { isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
