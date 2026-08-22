import { useState } from "react";
import { createCategory } from "../../services/category.service";

export const useCategoryForm = (onSuccess) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async ({ title, slug, description, iconFile, filters }) => {
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("filters", JSON.stringify(filters));
    iconFile && formData.append("iconFile", iconFile);

    console.log([...formData.entries()]);

    try {
      await createCategory(formData);
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در ایجاد دسته بندی");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { error, isSubmitting, submit };
};
