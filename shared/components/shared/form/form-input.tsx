"use client"
import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/shared/components/ui";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({
  name,
  label,
  required,
  className,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={`${className} select-none`}>
      <label className="font-medium mb-2 block cursor-pointer">
        {label && <span>{label} {required && <RequiredSymbol />}</span>}

        <div className="relative mt-2">
          <Input className="h-12 text-md" {...props} {...register(name)} />
          {value && <ClearButton onClick={onClickClear} />}
        </div>
      </label>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
