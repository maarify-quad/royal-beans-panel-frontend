import React from "react";

// Services
import { useCreateCustomerMutation } from "@services/customerApi";

// UI Components
import { Autocomplete, Button, Group, LoadingOverlay, Stepper } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Components
import { GeneralStep } from "./GeneralStep";
import { ContactStep } from "./ContactStep";
import { CommercialStep } from "./CommercialStep";
import { ExtraStep } from "./ExtraStep";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Utils
import { handleFormError } from "@utils/form";

export const CreateCustomer = () => {
  // Internal state
  const [step, setStep] = React.useState(0);

  const nextStep = () => setStep((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  // Mutations
  const [createCustomer, { isLoading: isCreating }] = useCreateCustomerMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const onCreateCustomerSubmit = async (values: Inputs) => {
    try {
      await createCustomer({
        ...values,
        priceListId: values.priceListId !== "0" ? +values.priceListId : undefined,
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Müşteri oluşturuldu",
        icon: <IconCircleCheck />,
        color: "green",
      });
      closeAllModals();
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onCreateCustomerSubmit, handleFormError)}>
      <LoadingOverlay visible={isCreating} />
      <Stepper active={step}>
        <Stepper.Step>
          <GeneralStep form={form} />
        </Stepper.Step>
        <Stepper.Step>
          <ContactStep form={form} />
        </Stepper.Step>
        <Stepper.Step>
          <CommercialStep form={form} />
        </Stepper.Step>
        <Stepper.Step>
          <ExtraStep form={form} />
        </Stepper.Step>
      </Stepper>
      <Group mt="lg">
        <Button variant="default" disabled={step === 0} onClick={prevStep}>
          Geri
        </Button>
        {step === 3 ? (
          <>
            <Button type="submit" loading={isCreating}>
              Müşteri Oluştur
            </Button>
          </>
        ) : (
          <Button onClick={nextStep}>İleri</Button>
        )}
      </Group>
    </form>
  );
};
