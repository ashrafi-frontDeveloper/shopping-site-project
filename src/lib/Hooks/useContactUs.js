import { useState } from "react";
import { sendContactUsMessage } from "../../services/contactUs.service";
import { validate } from "../../validators";
import { contactUsSchema } from "../../validators/contactus";
import { toast } from "sonner";

const useContactUs = (initialForm = {}) => {
  const [form, setForm] = useState(initialForm);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = ({ target }) => {
    const { name, value } = target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validate(contactUsSchema, form)) return;

    setIsSubmitting(true);

    const response = await sendContactUsMessage(form);

    toast.promise(response, {
      loading: "در حال ارسال پیام",
      success: () => {
        resetForm();
        setIsSubmitting(false);

        return "پیام شما با موفقیت ارسال شد";
      },

      error: (error) => {
        setIsSubmitting(false);

        return error.response?.data?.message || "ارسال پیام با شکست مواجه شد";
      },
    });
  };

  return { form, isSubmitting, changeHandler, submitHandler };
};

export default useContactUs