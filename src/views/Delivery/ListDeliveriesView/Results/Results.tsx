import React from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetAllDeliveriesQuery } from "@services/deliveryApi";

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
  const { data, isLoading, error } = useGetAllDeliveriesQuery(page);

  // Routing
  const navigate = useNavigate();

  const handleRowClick = (id: string) => () => {
    navigate(`/dashboard/deliveries/${id}`);
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

  if (data?.deliveries.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Sevkiyat bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Sevkiyat Tarihi</th>
            <th>Sevkiyat Kodu</th>
            <th>Tedarikçi</th>
            <th>Tutar</th>
          </tr>
        </thead>
        <tbody>
          {data?.deliveries.map((delivery, i) => (
            <tr
              onClick={handleRowClick(delivery.id)}
              style={{ width: "100%", cursor: "pointer" }}
              key={i}
            >
              <td>{dayjs(delivery.deliveryDate).format("DD MMM YYYY")}</td>
              <td>{delivery.id}</td>
              <td>{delivery.supplier.name}</td>
              <td>{delivery.total} ₺</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data?.totalPage && data.totalPage > 1 ? (
        <Pagination onPageChange={setPage} total={data?.totalPage} page={page} />
      ) : null}
    </Container>
  );
};
