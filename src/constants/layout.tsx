// Icons
import {
  IconTruckDelivery,
  IconUsers,
  IconShoppingCart,
  IconUserCircle,
  IconPackage,
  IconCoffee,
  IconTags,
  TablerIcon,
  IconPackages,
} from "@tabler/icons";

export const NAV_LINKS: NavLink[] = [
  {
    label: "Tedarikçiler",
    icon: IconUsers,
    match: "/suppliers",
    link: "/dashboard/suppliers",
  },
  {
    label: "Sevkiyatlar",
    icon: IconTruckDelivery,
    match: "/deliveries",
    link: "/dashboard/deliveries",
  },
  {
    label: "Depo",
    icon: IconPackage,
    match: "storage",
    link: "/dashboard/storage",
  },
  {
    label: "Kavrum",
    icon: IconCoffee,
    match: "roasts",
    link: "/dashboard/roasts",
  },
  {
    label: "Siparişler",
    icon: IconShoppingCart,
    match: "orders",
    link: "/dashboard/orders",
  },
  {
    label: "Müşteriler",
    icon: IconUserCircle,
    match: "customers",
    link: "/dashboard/customers",
  },
  {
    label: "Fiyat Listeleri",
    icon: IconTags,
    match: "price-lists",
    link: "/dashboard/price-lists",
  },
  {
    label: "Stok Admin",
    icon: IconPackages,
    match: "stock-admin",
    link: "/dashboard/stock-admin",
    roles: ["admin"],
  },
];

export type NavLink = {
  label: string;
  icon: TablerIcon;
  match: string;
  link: string;
  roles?: string[];
};
