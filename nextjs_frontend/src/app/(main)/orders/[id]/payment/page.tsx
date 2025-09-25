interface OrderPaymentPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPaymentPage({
  params,
}: OrderPaymentPageProps) {
  const { id } = await params;

  return <div>Order Payment: {id}</div>;
}
