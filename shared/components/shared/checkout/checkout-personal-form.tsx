"use client"
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form";

interface Props {
    className?: string;
}

export const CheckoutPersonalForm = ({ className }: Props) => {
    return (
        <WhiteBlock title="2. Personal Information" className={className}>
            <div className="grid grid-cols-2 gap-4">
                <FormInput name="firstName" placeholder="First name" required className="text-base" />
                <FormInput name="lastName" placeholder="Last name" required className="text-base" />
                <FormInput name="email" placeholder="Email" required className="text-base" />
                <FormInput name="phone" placeholder="Phone" required className="text-base" />
            </div>
        </WhiteBlock>
    )
}