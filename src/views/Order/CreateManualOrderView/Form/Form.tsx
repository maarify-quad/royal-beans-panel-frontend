import React, { useEffect } from "react";

// Routing
import { useNavigate } from "react-router-dom";

// Services
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
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

// Utils
import { handleFormError } from "@utils/form";

// Props
type Props = {
  setReceiver: (receiver?: string) => void;
};

export const Form = ({ setReceiver }: Props) => {
  const navigate = useNavigate();

  // State
  const [step, setStep] = React.useState(0);

  const nextStep = () => setStep((current) => (current < 1 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  // Mutations
  const [createManualOrder, { isLoading: isCreatingOrder }] = useCreateManualOrderMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    transformValues: (values) => ({
      ...values,
      receiverAddress: values.receiverAddress || null,
      receiverNeighborhood: values.receiverNeighborhood || null,
      receiverProvince: values.receiverProvince || null,
      receiverCity: values.receiverCity || null,
      receiverPhone: values.receiverPhone || null,
      specialNote: values.specialNote || null,
    }),
    validate: zodResolver(schema),
  });

  const handleAddProduct = () => {
    // Destructure form values
    const { productId, grindType, unitPrice, quantity, taxRate, subTotal, total, product } =
      form.values;

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
        receiverId,
        receiverNeighborhood,
        receiverAddress,
        receiverCity,
        receiverProvince,
        receiverPhone,
        isSaveReceiverChecked,
        manualInvoiceStatus,
        specialNote,
        orderProducts,
      } = values;

      // Create order
      const order = await createManualOrder({
        receiverId: receiverId ? +receiverId : null,
        receiver,
        receiverNeighborhood,
        receiverAddress,
        receiverCity,
        receiverProvince,
        receiverPhone,
        isSaveReceiverChecked,
        manualInvoiceStatus,
        specialNote,
        orderProducts,
      }).unwrap();

      showNotification({
        title: "Başarılı",
        message: `${order.orderId} nolu gönderi oluşturuldu.`,
        icon: <IconCircleCheck />,
        color: "green",
      });

      navigate("/dashboard/orders");
    } catch {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  useEffect(() => {
    setReceiver(form.values.receiver);
  }, [form.values.receiver]);

  return (
    <form onSubmit={form.onSubmit(onCreateOrderSubmit, handleFormError)}>
      <LoadingOverlay visible={isCreatingOrder} />
      <Stepper active={step} mt="md">
        <Stepper.Step>
          <StepOne form={form} />
        </Stepper.Step>
        <Stepper.Step>
          <StepTwo form={form} />
        </Stepper.Step>
      </Stepper>
      <Group mt="lg">
        <Button variant="default" disabled={step === 0} onClick={prevStep}>
          Geri
        </Button>
        {step === 1 ? (
          <Button disabled={form.values.productId === "0"} onClick={handleAddProduct}>
            Ürün Ekle
          </Button>
        ) : (
          <Button onClick={nextStep}>İleri</Button>
        )}
      </Group>
    </form>
  );
};
