"use client"
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form";
import { AddressInput } from "../address-input";
import { useFormContext, Controller } from "react-hook-form";
import { ErrorText } from "..";

interface Props {
    className?: string;
}

export const CheckoutAddressForm = ({ className }: Props) => {
    const { control } = useFormContext();

    return (
        <WhiteBlock title="3. Delivery Address" className={className}>
            <div className="flex flex-col gap-3">
                <div>
                    <Controller 
                        control={control}
                        name="address"
                        render={({ field, fieldState }) => (
                            <>
                                <AddressInput onChange={field.onChange} />
                                {fieldState.error?.message && <ErrorText className="mt-2" text={fieldState.error.message} />}
                            </>
                        )}
                    />
                </div>

                <FormTextarea 
                    name="comment" 
                    placeholder="Order comments" 
                    rows={4} 
                    className="text-base" 
                />
            </div>
        </WhiteBlock>
    )
}