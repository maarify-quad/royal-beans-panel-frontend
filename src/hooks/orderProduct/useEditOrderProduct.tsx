import { useState } from "react";

// Services
import { orderApi } from "@services/orderApi";
import { useUpdateOrderProductMutation } from "@services/orderProductApi";

// Redux
import { useReduxDispatch } from "@app/hook";

// Mantine
import { Button, NumberInput } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";

// Interfaces
import { OrderProduct } from "@interfaces/orderProduct";

export const useEditOrderProduct = () => {
  const handleEditOrderProduct = (orderProduct: OrderProduct, orderId: string) => {
    const productName = orderProduct.priceListProduct.product.name || orderProduct.product.name;
    openModal({
      title: `${productName} Ürününü Düzenle`,
      children: <EditOrderProduct orderProduct={orderProduct} orderId={orderId} />,
    });
  };

  return { handleEditOrderProduct };
};

const EditOrderProduct = ({
  orderProduct,
  orderId,
}: {
  orderProduct: OrderProduct;
  orderId: string;
}) => {
  const dispatch = useReduxDispatch();
  const [newQuantity, setNewQuantity] = useState(orderProduct.quantity);
  const [updateOrderProduct, { isLoading: isUpdating }] = useUpdateOrderProductMutation();

  const handleSubmit = async (orderProduct: OrderProduct, orderId: string) => {
    try {
      const { id } = orderProduct;
      await updateOrderProduct({ id, quantity: newQuantity }).unwrap();
      dispatch(orderApi.util.invalidateTags([{ type: "Order", id: orderId }]));
      closeAllModals();
    } catch {}
  };

  return (
    <div>
      <NumberInput
        label="Adet"
        value={newQuantity}
        min={1}
        onChange={(value) => setNewQuantity(value || 1)}
      />
      <Button mt="md" onClick={() => handleSubmit(orderProduct, orderId)} loading={isUpdating}>
        Güncelle
      </Button>
    </div>
  );
};
