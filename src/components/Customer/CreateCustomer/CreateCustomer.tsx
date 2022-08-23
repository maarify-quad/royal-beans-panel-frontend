import React, { useEffect } from "react";

// Services
import { useCreateCustomerMutation } from "@services/customerApi";

// UI Components
import { Button, Group, LoadingOverlay, Stepper } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

// Icons
import { CircleCheck as CircleCheckIcon, X as ErrorIcon } from "tabler-icons-react";

// Components
import { GeneralStep } from "./GeneralStep";
import { ContactStep } from "./ContactStep";
import { CommercialStep } from "./CommercialStep";
import { ExtraStep } from "./ExtraStep";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";

export const CreateCustomer = () => {
  // Internal state
  const [step, setStep] = React.useState(0);

  const nextStep = () => setStep((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  // Mutations
  const [createCustomer, { isSuccess, isLoading, error }] = useCreateCustomerMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const onCreateCustomerSubmit = async (values: Inputs) => {
    try {
      await createCustomer(values);
    } catch (error) {
      showNotification({
        title: "Müşteri oluşturulamadı",
        message: "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "Başarılı",
        message: "Müşteri oluşturuldu",
        icon: <CircleCheckIcon />,
        color: "green",
      });
      closeModal("createCustomerModal");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Müşteri oluşturulamadı",
        message: (error as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  }, [(error as any)?.data?.message]);

  return (
    <form onSubmit={form.onSubmit(onCreateCustomerSubmit)}>
      <LoadingOverlay visible={isLoading} />
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
            <Button type="submit" loading={isLoading}>
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
