import { useState } from "react";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useCreateFasonOrderMutation } from "@services/orderApi";

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

// Utils
import { handleFormError } from "@utils/form";

// Interfaces
import { Customer } from "@interfaces/customer";
import { useGetProductsByStorageTypeQuery } from "@services/productApi";

// Props
type Props = {
  setCustomer: (customer?: Customer) => void;
};

export const Form = ({ setCustomer }: Props) => {
  const navigate = useNavigate();

  // Internal state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((current) => (current < 1 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  // Mutations
  const [createFasonOrder, { isLoading: isCreatingOrder }] = useCreateFasonOrderMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const handleAddProduct = () => {
    // Destructure form values
    const { productId, grindType, weight, quantity, product } = form.values;

    // Add product to order
    form.insertListItem("orderProducts", {
      productId: +productId,
      product,
      grindType,
      weight,
      quantity,
    });
  };

  const onCreateOrderSubmit = async (values: Inputs) => {
    try {
      // Destructure form values
      const { customerId, specialNote, orderProducts } = values;

      // Create order
      const order = await createFasonOrder({
        customerId,
        specialNote,
        orderProducts,
      }).unwrap();

      showNotification({
        title: "Başarılı",
        message: `${order.orderId} nolu fason sipariş oluşturuldu.`,
        icon: <IconCircleCheck />,
        color: "green",
      });

      navigate("/dashboard/orders");
    } catch {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreateOrderSubmit, handleFormError)}>
      <LoadingOverlay visible={isCreatingOrder} />
      <Stepper active={step} mt="md">
        <Stepper.Step>
          <StepOne
            form={form}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={(customer) => {
              setSelectedCustomer(customer);
              setCustomer(customer);
            }}
          />
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
            Ürün ekle
          </Button>
        ) : (
          <Button disabled={!selectedCustomer} onClick={nextStep}>
            İleri
          </Button>
        )}
      </Group>
    </form>
  );
};
