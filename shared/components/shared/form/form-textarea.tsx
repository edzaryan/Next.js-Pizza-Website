"use client";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../../ui/textarea";
import { ClearButton } from "../clear-button";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea = ({ className, name, label, required, ...props }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
  };

  return (
    <div className={className}>
      <div className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </div>

      <div className="relative">
        <Textarea className="min-h-16 text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} className="top-6 z-10" />}
      </div>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  )
}