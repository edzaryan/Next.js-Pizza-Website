import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/shared/components/ui";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput = ({ name, label, required, className, ...props }: Props) => {
    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input className="h-12 text-md" {...props} />
                <ClearButton />
            </div>

            <ErrorText text="The field is required" className="mt-2" />
        </div>
    )
}