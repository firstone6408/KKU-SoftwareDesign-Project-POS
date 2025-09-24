interface OrderWorkingPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderWorkingPage({
  params,
}: OrderWorkingPageProps) {
  const { id } = await params;
  return <div>OrderWorkingPage: {id}</div>;
}
