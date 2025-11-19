
interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate = ({ orderId, totalAmount, paymentUrl }: Props) => (
  <div>
    <h1>Order #{orderId}</h1>

    <p>
      Please pay the order totaling <b>{totalAmount} ₽</b>. Go
      <a href={paymentUrl}>to this link</a> to complete the payment.
    </p>
  </div>
)