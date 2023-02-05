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
  IconTableExport,
} from "@tabler/icons";

export const NAV_LINKS: NavLink[] = [
  {
    label: "Stok",
    icon: IconPackages,
    match: /^\/dashboard\/(deliveries|storage|stock-admin)/,
    link: "#",
    subLinks: [
      {
        label: "Sevkiyatlar",
        link: "/dashboard/deliveries",
        match: /^\/dashboard\/deliveries/,
      },
      {
        label: "Depo",
        link: "/dashboard/storage",
        match: /^\/dashboard\/storage/,
      },
      {
        label: "Admin",
        link: "/dashboard/stock-admin",
        match: /^\/dashboard\/stock-admin/,
        roles: ["admin"],
      },
    ],
  },
  {
    label: "Tedarikçiler",
    icon: IconUsers,
    match: /suppliers/,
    link: "/dashboard/suppliers",
  },
  {
    label: "Kavrum",
    icon: IconCoffee,
    match: /roasts/,
    link: "/dashboard/roasts",
  },
  {
    label: "Siparişler",
    icon: IconShoppingCart,
    match: /orders/,
    link: "/dashboard/orders",
  },
  {
    label: "Müşteriler",
    icon: IconUserCircle,
    match: /customers/,
    link: "/dashboard/customers",
  },
  {
    label: "Fiyat Listeleri",
    icon: IconTags,
    match: /price-lists/,
    link: "/dashboard/price-lists",
  },
  {
    label: "Shoppar",
    icon: IconTableExport,
    match: /shoppar/,
    link: "/dashboard/shoppar",
  },
];

export type NavLink = {
  label: string;
  icon: TablerIcon;
  link: string;
  match: RegExp;
  roles?: string[];
  subLinks?: SubNavLink[];
};

export type SubNavLink = {
  label: string;
  link: string;
  roles?: string[];
  match: RegExp;
};
