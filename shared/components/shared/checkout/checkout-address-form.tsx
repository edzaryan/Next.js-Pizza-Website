import { WhiteBlock } from "../white-block";
import { Input, Textarea } from "../../ui";

interface Props {
    className?: string;
}

export const CheckoutAddressForm = ({ className }: Props) => {
    return (
        <WhiteBlock title="3. Delivery Address">
            <div className="flex flex-col gap-5">
                <Input name="address" placeholder="Type Address" className="text-base" />
                <Textarea placeholder="Order comments" rows={4} className="text-base"  />
            </div>
        </WhiteBlock>
    )
}