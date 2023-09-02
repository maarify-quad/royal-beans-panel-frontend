// Icons
import {
  IconUsers,
  IconShoppingCart,
  IconUserCircle,
  IconCoffee,
  IconTags,
  TablerIcon,
  IconPackages,
  IconTableExport,
  IconFileCode,
  IconCoin,
} from "@tabler/icons";

export const NAV_LINKS: NavLink[] = [
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
    label: "Kavrum",
    icon: IconCoffee,
    match: /roasts/,
    link: "/dashboard/roasts",
  },
  {
    label: "Stok",
    icon: IconPackages,
    match: /^\/dashboard\/(deliveries|storage|stock-admin)/,
    link: "/dashboard/storage",
    subLinks: [
      {
        label: "Depo",
        link: "/dashboard/storage",
        match: /^\/dashboard\/storage/,
      },
      {
        label: "Sevkiyatlar",
        link: "/dashboard/deliveries",
        match: /^\/dashboard\/deliveries/,
      },
      {
        label: "Kahve Stok",
        link: "/dashboard/coffee-stock",
        match: /^\/dashboard\/coffee-stock/,
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
    label: "Fiyat Listeleri",
    icon: IconTags,
    match: /price-lists/,
    link: "/dashboard/price-lists",
  },
  {
    label: "Finans",
    icon: IconCoin,
    match: /finance/,
    link: "/dashboard/finance",
  },
  {
    label: "Shoppar",
    icon: IconTableExport,
    match: /shoppar/,
    link: "/dashboard/shoppar",
  },
  {
    label: "Loglar",
    icon: IconFileCode,
    match: /logs/,
    link: "/dashboard/logs",
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
