import React from "react";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetAllSuppliersQuery } from "@services/supplierApi";

// UI Components
import { Table, Container, Loader, Alert } from "@mantine/core";

// Components
import { Pagination } from "./Pagination";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

export const Results = () => {
  // Internal state
  const [page, setPage] = React.useState(1);

  // Queries
  const { data, isLoading, error } = useGetAllSuppliersQuery(page);

  // Routing
  const navigate = useNavigate();

  const handleRowClick = (id: string) => () => {
    navigate(`/dashboard/suppliers/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
        color="red"
        title="Tedarikçilere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.suppliers.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Tedarikçi bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Tedarikçi Adı</th>
            <th>Tedarikçi Kodu</th>
            <th>Toplam Hacim</th>
          </tr>
        </thead>
        <tbody>
          {data?.suppliers.map((supplier, i) => (
            <tr
              onClick={handleRowClick(supplier.id)}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
              key={i}
            >
              <td>{supplier.name}</td>
              <td>{supplier.id}</td>
              <td>{supplier.totalVolume} ₺</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data?.totalPage && data.totalPage > 1 ? (
        <Pagination onPageChange={setPage} total={data.totalPage} page={page} />
      ) : null}
    </Container>
  );
};
