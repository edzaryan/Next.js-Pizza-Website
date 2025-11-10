"use client"
import dynamic from "next/dynamic";

const AddressSuggestions = dynamic(
  () =>
    import("react-dadata").then(mod => ({
      default: mod.AddressSuggestions,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-12 w-full border rounded-[20px] px-3 py-2 bg-gray-50" />
    ),
  }
);

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput = ({ onChange }: Props) => {
  return (
    <AddressSuggestions
      token="fce17ff43f9d553c25997d583cc8afa97495a744"
      onChange={data => onChange?.(data?.value)}
      count={5}
    />
  )
}
