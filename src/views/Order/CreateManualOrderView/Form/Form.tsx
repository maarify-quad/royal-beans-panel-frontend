import React from "react";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";
import { useCreateManualOrderMutation } from "@services/orderApi";

// UI Components
import { Button, Group, LoadingOverlay, Stepper } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Components
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";

export const Form = () => {
  const navigate = useNavigate();

  // Internal state
  const [step, setStep] = React.useState(0);

  const nextStep = () => setStep((current) => (current < 1 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  // Queries
  const { products, isLoading: isProductsLoading } = useGetProductsByStorageTypeQuery(
    { storageType: "FN" },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        products: data?.products,
      }),
    }
  );

  // Mutations
  const [createManualOrder, { isLoading: isCreatingOrder }] = useCreateManualOrderMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const handleAddProduct = () => {
    // Destructure form values
    const { productId, grindType, unitPrice, quantity, taxRate, subTotal, total } = form.values;

    // Find product
    const product = products?.find((product) => product.id.toString() === productId);

    // Add product to order
    form.insertListItem("orderProducts", {
      productId: +productId,
      product,
      grindType,
      unitPrice,
      quantity,
      taxRate,
      subTotal,
      total,
    });
  };

  const onCreateOrderSubmit = async (values: Inputs) => {
    try {
      // Destructure form values
      const {
        receiver,
        receiverNeighborhood,
        receiverAddress,
        receiverCity,
        receiverProvince,
        receiverPhone,
        manualInvoiceStatus,
        specialNote,
        orderProducts,
      } = values;

      // Create order
      await createManualOrder({
        receiver,
        receiverNeighborhood,
        receiverAddress,
        receiverCity,
        receiverProvince,
        receiverPhone,
        manualInvoiceStatus,
        specialNote,
        orderProducts,
      }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Manuel gönderi oluşturuldu",
        icon: <IconCircleCheck />,
        color: "green",
      });

      navigate("/dashboard/orders");
    } catch {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreateOrderSubmit)}>
      <LoadingOverlay visible={isCreatingOrder || isProductsLoading} />
      <Stepper active={step} mt="md">
        <Stepper.Step>
          <StepOne form={form} />
        </Stepper.Step>
        <Stepper.Step loading={isProductsLoading}>
          <StepTwo products={products} form={form} />
        </Stepper.Step>
      </Stepper>
      <Group mt="lg">
        <Button variant="default" disabled={step === 0} onClick={prevStep}>
          Geri
        </Button>
        {step === 1 ? (
          <Button disabled={form.values.productId === "0"} onClick={handleAddProduct}>
            Ürün ekle
          </Button>
        ) : (
          <Button onClick={nextStep}>İleri</Button>
        )}
      </Group>
    </form>
  );
};
