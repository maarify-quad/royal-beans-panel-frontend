import React from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetAllRoastsQuery } from "@services/roastApi";

// UI Components
import { Table, Container, Loader, Alert } from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

export const Results = () => {
  // Internal state
  const [page, setPage] = React.useState(1);

  // Queries
  const { data, isLoading, error } = useGetAllRoastsQuery();

  // Routing
  const navigate = useNavigate();

  const handleRowClick = (id: string) => () => {
    navigate(`/dashboard/roasts/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
        color="red"
        title="Kavrumlara ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.roasts.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Kavrum bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Kavrum Kodu</th>
            <th>Toplam Miktar</th>
          </tr>
        </thead>
        <tbody>
          {data?.roasts.map((roast, i) => (
            <tr
              onClick={handleRowClick(roast.id)}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
              key={i}
            >
              <td>{dayjs(roast.date).format("DD MMM YYYY - HH:mm")}</td>
              <td>{roast.id}</td>
              <td>{roast.totalInputAmount} kg</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
