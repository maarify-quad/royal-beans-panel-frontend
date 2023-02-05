// Redux
import { useReduxSelector } from "@app/hook";
import { selectRoles } from "@slices/authSlice";

// Constants
import { NavLink, NAV_LINKS } from "@constants/routes";

export const useNavLinks = () => {
  const roles = useReduxSelector(selectRoles);

  const navLinks: NavLink[] = NAV_LINKS.filter((link) => {
    if (link.roles) {
      return link.roles.some((role) => roles.includes(role));
    }

    if (link.subLinks) {
      link.subLinks = link.subLinks.filter((subLink) => {
        if (subLink.roles) {
          return subLink.roles.some((role) => roles.includes(role));
        }

        return true;
      });
    }

    return true;
  });

  return { navLinks };
};
