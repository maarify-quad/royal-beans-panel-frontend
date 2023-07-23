// Services
import { orderApi } from "@services/orderApi";
import { useDeleteOrderProductMutation } from "@services/orderProductApi";

// Redux
import { useReduxDispatch } from "@app/hook";

// Mantine
import { openConfirmModal } from "@mantine/modals";

export const useDeleteOrderProduct = () => {
  const dispatch = useReduxDispatch();
  const [deleteOrderProduct, { isLoading: isDeleting }] = useDeleteOrderProductMutation();

  const handleDeleteOrderProduct = (id: number, orderId: string) => {
    openConfirmModal({
      title: "Ürünü silmek istediğinize emin misiniz?",
      confirmProps: { color: "red" },
      labels: { cancel: "Vazgeç", confirm: "Sil" },
      onConfirm: async () => {
        try {
          await deleteOrderProduct(id).unwrap();
          dispatch(orderApi.util.invalidateTags([{ type: "Order", id: orderId }]));
        } catch {}
      },
    });
  };

  return { handleDeleteOrderProduct, isDeleting };
};
