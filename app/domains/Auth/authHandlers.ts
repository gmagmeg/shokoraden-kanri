import { getBaseURL } from "@/server/function";
import { FormEvent } from "react";

export const handleLoginSubmit = async (
  event: FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  closeModal: () => void
): Promise<void> => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('email', String(email));
  formData.append('password', String(password));

  await fetch(
    `${getBaseURL()}api/user/login`,
    {
      method: 'POST',
      body: formData
    });

  closeModal();
};

export const handleRegisterSubmit = async (
  event: FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  closeModal: () => void
): Promise<void> => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('name', 'test');
  formData.append('email', String(email));
  formData.append('password', String(password));

  await fetch(
    `${getBaseURL()}/api/user/register`,
    {
      method: 'POST',
      body: formData
    });

  await handleLoginSubmit(event, email, password, closeModal);

  closeModal();
};
