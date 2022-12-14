import React from "react";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetPriceListProductsQuery } from "@services/priceListProductApi";
import { useCreateOrderMutation } from "@services/orderApi";

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

// Interfaces
import { Customer } from "@interfaces/customer";

export const Form = () => {
  const navigate = useNavigate();

  // Internal state
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>();
  const [step, setStep] = React.useState(0);

  const nextStep = () => setStep((current) => (current < 1 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  // Queries
  const { data: priceListProducts, isLoading: isPriceListProductsLoading } =
    useGetPriceListProductsQuery(selectedCustomer?.priceListId || 0, {
      skip: !selectedCustomer,
    });

  // Mutations
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const handleAddProduct = () => {
    // Destructure form values
    const { priceListProductId, grindType, unitPrice, quantity, taxRate, subTotal, total } =
      form.values;

    // Find price list product
    const priceListProduct = priceListProducts?.find(
      (priceListProduct) => priceListProduct.id === priceListProductId
    );

    // Add product to order
    form.insertListItem("orderProducts", {
      priceListProduct,
      priceListProductId,
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
        customerId,
        deliveryDate,
        deliveryAddressId,
        deliveryType,
        specialNote,
        orderProducts,
      } = values;

      // Create order
      await createOrder({
        customerId,
        deliveryDate,
        deliveryAddressId,
        deliveryType,
        specialNote,
        orderProducts,
      }).unwrap();

      showNotification({
        title: "Ba??ar??l??",
        message: "Sipari?? olu??turuldu",
        icon: <IconCircleCheck />,
        color: "green",
      });

      navigate("/dashboard/orders");
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreateOrderSubmit)}>
      <LoadingOverlay visible={isCreatingOrder || isPriceListProductsLoading} />
      <Stepper active={step} mt="md">
        <Stepper.Step>
          <StepOne
            form={form}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
          />
        </Stepper.Step>
        <Stepper.Step loading={isPriceListProductsLoading}>
          <StepTwo form={form} priceListProducts={priceListProducts} />
        </Stepper.Step>
      </Stepper>
      <Group mt="lg">
        <Button variant="default" disabled={step === 0} onClick={prevStep}>
          Geri
        </Button>
        {step === 1 ? (
          <Button disabled={!form.values.priceListProductId} onClick={handleAddProduct}>
            ??r??n ekle
          </Button>
        ) : (
          <Button disabled={!selectedCustomer} onClick={nextStep}>
            ??leri
          </Button>
        )}
      </Group>
    </form>
  );
};
