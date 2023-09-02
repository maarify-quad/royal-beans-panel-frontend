// Redux
import { useReduxSelector } from "@app/hook";
import { selectRoles } from "@slices/authSlice";

export const useVerifyRole = (roles: string[]) => {
  const userRoles = useReduxSelector(selectRoles);

  return roles.some((role) => userRoles.includes(role));
};
