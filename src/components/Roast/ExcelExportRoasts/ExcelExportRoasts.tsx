import { FormEvent, useState } from "react";

// Services
import { useGetRoastsExcelExportMutation } from "@services/roastApi";

// Mantine UI
import { DateRangePicker } from "@mantine/dates";
import { Button } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";

// Utils
import dayjs from "dayjs";

export const ExcelExportRoasts = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  // Mutations
  const [getRoastsExcelExport, { isLoading: isExporting }] = useGetRoastsExcelExportMutation();

  const handleExcelExport = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const startDate = dateRange[0] ? dayjs(dateRange[0]).startOf("day").toISOString() : null;
      const endDate = dateRange[1] ? dayjs(dateRange[1]).endOf("day").toISOString() : null;

      const { url } = await getRoastsExcelExport({ startDate, endDate }).unwrap();

      closeAllModals();

      window.open(url, "_blank");
    } catch {}
  };

  return (
    <form onSubmit={handleExcelExport} noValidate>
      <DateRangePicker
        label="Tarih aralığı"
        placeholder="Kavrum tarih aralığı seçebilirsiniz"
        value={dateRange}
        onChange={setDateRange}
      />
      <Button type="submit" mt="md" loading={isExporting}>
        İndir
      </Button>
    </form>
  );
};
