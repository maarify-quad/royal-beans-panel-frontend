import React from "react";

// Routing
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

// Guards
import { AuthGuard } from "@components/AuthGuard";
import { GuestGuard } from "@components/GuestGuard";

// Layouts
import { DashboardLayout } from "./layouts/DashboardLayout";

// Components
import { LoadingScreen } from "@components/LoadingScreen";

// Auth Views
const LoginView = React.lazy(() =>
  import("./views/Auth/LoginView").then((module) => ({ default: module.LoginView }))
);

// Supplier Views
const ListSuppliersView = React.lazy(() =>
  import("./views/Supplier/ListSuppliersView").then((module) => ({
    default: module.ListSuppliersView,
  }))
);
const SupplierDetailsView = React.lazy(() =>
  import("./views/Supplier/SupplierDetailsView").then((module) => ({
    default: module.SupplierDetailsView,
  }))
);

// Delivery Views
const ListDeliveriesView = React.lazy(() =>
  import("./views/Delivery/ListDeliveriesView").then((module) => ({
    default: module.ListDeliveriesView,
  }))
);
const DeliveryDetailsView = React.lazy(() =>
  import("./views/Delivery/DeliveryDetailsView").then((module) => ({
    default: module.DeliveryDetailsView,
  }))
);
const CreateDeliveryView = React.lazy(() =>
  import("./views/Delivery/CreateDeliveryView").then((module) => ({
    default: module.CreateDeliveryView,
  }))
);

// Storage Views
const ListStorageView = React.lazy(() =>
  import("./views/Storage/ListStorageView").then((module) => ({
    default: module.ListStorageView,
  }))
);

// Roast Views
const ListRoastsView = React.lazy(() =>
  import("./views/Roast/ListRoastsView").then((module) => ({
    default: module.ListRoastsView,
  }))
);
const RoastDetailsView = React.lazy(() =>
  import("./views/Roast/RoastDetailsView").then((module) => ({
    default: module.RoastDetailsView,
  }))
);
const CreateRoastView = React.lazy(() =>
  import("./views/Roast/CreateRoastView").then((module) => ({
    default: module.CreateRoastView,
  }))
);

// Customer Views
const ListCustomersView = React.lazy(() =>
  import("./views/Customer/ListCustomersView").then((module) => ({
    default: module.ListCustomersView,
  }))
);
const CustomerDetailsView = React.lazy(() =>
  import("./views/Customer/CustomerDetailsView").then((module) => ({
    default: module.CustomerDetailsView,
  }))
);

// PriceList Views
const ListPriceListsView = React.lazy(() =>
  import("./views/PriceList/ListPriceListsView").then((module) => ({
    default: module.ListPriceListsView,
  }))
);
const PriceListDetailsView = React.lazy(() =>
  import("./views/PriceList/PriceListDetailsView").then((module) => ({
    default: module.PriceListDetailsView,
  }))
);

// Order Views
const ListOrdersView = React.lazy(() =>
  import("./views/Order/ListOrdersView").then((module) => ({
    default: module.ListOrdersView,
  }))
);

// Error Views
const NotFoundView = React.lazy(() =>
  import("./views/Error/NotFoundView").then((module) => ({ default: module.NotFoundView }))
);

export const AppRoutes = () => {
  const routes: RouteObject[] = [
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

  return <React.Suspense fallback={<LoadingScreen />}>{useRoutes(routes)}</React.Suspense>;
};
