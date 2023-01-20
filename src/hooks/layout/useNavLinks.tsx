// Redux
import { useReduxSelector } from "@app/hook";
import { selectRoles } from "@slices/authSlice";

// Constants
import { NAV_LINKS } from "@constants/layout";

export const useNavLinks = () => {
  const roles = useReduxSelector(selectRoles);

  const navLinks = NAV_LINKS.filter((link) => {
    if (link.roles) {
      return link.roles.some((role) => roles.includes(role));
    }

    return true;
  });

  return { navLinks };
};
