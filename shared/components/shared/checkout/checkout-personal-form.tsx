import { Input } from "../../ui";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form";

interface Props {
    className?: string;
}

export const CheckoutPersonalForm = ({ className }: Props) => {
    return (
        <WhiteBlock title="2. Personal Information">
            <div className="grid grid-cols-2 gap-4">
                <FormInput name="firstName" placeholder="First name" className="text-base" />
                <FormInput name="lastName" placeholder="Last name" className="text-base" />
                <FormInput name="email" placeholder="Email" className="text-base" />
                <FormInput name="phone" placeholder="Phone" className="text-base" />
            </div>
        </WhiteBlock>
    )
}