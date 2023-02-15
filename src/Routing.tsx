import React, { useMemo } from "react";

// Routing
import { Navigate, useRoutes } from "react-router-dom";

// Redux
import { useReduxSelector } from "@app/hook";
import { selectRoles } from "@slices/authSlice";

// Guards
import { AuthGuard } from "@components/AuthGuard";
import { GuestGuard } from "@components/GuestGuard";

// Layouts
import { DashboardLayout } from "./layouts/DashboardLayout";

// Components
import { LoadingScreen } from "@components/LoadingScreen";

// Auth Views
const LoginView = React.lazy(() => import("./views/Auth/LoginView"));

// Supplier Views
const ListSuppliersView = React.lazy(() => import("./views/Supplier/ListSuppliersView"));
const SupplierDetailsView = React.lazy(() => import("./views/Supplier/SupplierDetailsView"));

// Delivery Views
const ListDeliveriesView = React.lazy(() => import("./views/Delivery/ListDeliveriesView"));
const DeliveryDetailsView = React.lazy(() => import("./views/Delivery/DeliveryDetailsView"));
const CreateDeliveryView = React.lazy(() => import("./views/Delivery/CreateDeliveryView"));

// Storage Views
const ListStorageView = React.lazy(() => import("./views/Storage/ListStorageView"));
const ProductDetailsView = React.lazy(() => import("./views/Storage/ProductDetailsView"));

// Roast Views
const ListRoastsView = React.lazy(() => import("./views/Roast/ListRoastsView"));
const RoastDetailsView = React.lazy(() => import("./views/Roast/RoastDetailsView"));
const CreateRoastView = React.lazy(() => import("./views/Roast/CreateRoastView"));
const CreateRoastIngredientView = React.lazy(
  () => import("./views/RoastIngredient/CreateRoastIngredientView")
);

// Customer Views
const ListCustomersView = React.lazy(() => import("./views/Customer/ListCustomersView"));
const CustomerDetailsView = React.lazy(() => import("./views/Customer/CustomerDetailsView"));

// PriceList Views
const ListPriceListsView = React.lazy(() => import("./views/PriceList/ListPriceListsView"));
const PriceListDetailsView = React.lazy(() => import("./views/PriceList/PriceListDetailsView"));

// Order Views
const ListOrdersView = React.lazy(() => import("./views/Order/ListOrdersView"));
const OrderDetailsView = React.lazy(() => import("./views/Order/OrderDetailsView"));
const CreateOrderView = React.lazy(() => import("./views/Order/CreateOrderView"));
const CreateManualOrderView = React.lazy(() => import("./views/Order/CreateManualOrderView"));
const UpdateOrderView = React.lazy(() => import("./views/Order/UpdateOrderView"));
const UpdateManualOrderView = React.lazy(() => import("./views/Order/UpdateManualOrderView"));

// Stock Admin View
const StockAdminView = React.lazy(() => import("./views/StockAdmin/StockAdminView"));
const FnUpdateView = React.lazy(() => import("./views/StockAdmin/FnUpdateView"));
const ShopifyUpdateView = React.lazy(() => import("./views/StockAdmin/ShopifyUpdateView"));

// Shoppar Views
const ShopparView = React.lazy(() => import("./views/Shoppar/ShopparView"));

// Error Views
const NotFoundView = React.lazy(() => import("./views/Error/NotFoundView"));

type AppRoute = {
  caseSensitive?: boolean;
  children?: AppRoute[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  roles?: string[];
};

export const Routing = () => {
  const roles = useReduxSelector(selectRoles);

  const routes: AppRoute[] = [
    {
      path: "/",
      element: <Navigate to="/auth/login" replace />,
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard/suppliers" replace />,
        },
        {
          path: "/dashboard/suppliers",
          element: <ListSuppliersView />,
        },
        {
          path: "/dashboard/suppliers/:id",
          element: <SupplierDetailsView />,
        },
        {
          path: "/dashboard/deliveries",
          element: <ListDeliveriesView />,
        },
        {
          path: "/dashboard/deliveries/:id",
          element: <DeliveryDetailsView />,
        },
        {
          path: "/dashboard/deliveries/create",
          element: <CreateDeliveryView />,
        },
        {
          path: "/dashboard/storage",
          element: <ListStorageView />,
        },
        {
          path: "/dashboard/storage/:stockCode",
          element: <ProductDetailsView />,
        },
        {
          path: "/dashboard/roasts",
          element: <ListRoastsView />,
        },
        {
          path: "/dashboard/roasts/:id",
          element: <RoastDetailsView />,
        },
        {
          path: "/dashboard/roasts/create",
          element: <CreateRoastView />,
        },
        {
          path: "/dashboard/roasts/ingredients/create",
          element: <CreateRoastIngredientView />,
        },
        {
          path: "/dashboard/customers",
          element: <ListCustomersView />,
        },
        {
          path: "/dashboard/customers/:id",
          element: <CustomerDetailsView />,
        },
        {
          path: "/dashboard/price-lists",
          element: <ListPriceListsView />,
        },
        {
          path: "/dashboard/price-lists/:id",
          element: <PriceListDetailsView />,
        },
        {
          path: "/dashboard/orders",
          element: <ListOrdersView />,
        },
        {
          path: "/dashboard/orders/:orderId",
          element: <OrderDetailsView />,
        },
        {
          path: "/dashboard/orders/create",
          element: <CreateOrderView />,
        },
        {
          path: "/dashboard/orders/manual/create",
          element: <CreateManualOrderView />,
        },
        {
          path: "/dashboard/orders/update/:orderId",
          element: <UpdateOrderView />,
        },
        {
          path: "/dashboard/orders/manual/update/:orderId",
          element: <UpdateManualOrderView />,
        },
        {
          path: "/dashboard/stock-admin",
          element: <StockAdminView />,
          roles: ["admin"],
        },
        {
          path: "/dashboard/stock-admin/fn-update/:stockCode",
          element: <FnUpdateView />,
          roles: ["admin"],
        },
        {
          path: "/dashboard/stock-admin/shopify-update/:shopifyVariantId",
          element: <ShopifyUpdateView />,
          roles: ["admin"],
        },
        {
          path: "/dashboard/shoppar",
          element: <ShopparView />,
        },
      ],
    },
    {
      path: "/auth",
      element: <GuestGuard />,
      children: [
        {
          path: "/auth/login",
          element: <LoginView />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundView />,
    },
  ];

  const filterRoutes = (routes: AppRoute[]): AppRoute[] => {
    return routes
      .map((route) => {
        if (route.children) {
          return {
            ...route,
            children: filterRoutes(route.children),
          };
        }
        return route;
      })
      .filter((route) => {
        if (route.roles) {
          return route.roles.some((role) => roles.includes(role));
        }
        return true;
      });
  };

  const filteredRoutes = useMemo(() => filterRoutes(routes), [roles]);

  return <React.Suspense fallback={<LoadingScreen />}>{useRoutes(filteredRoutes)}</React.Suspense>;
};
