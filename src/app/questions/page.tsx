import { Questions } from '@/widgets/questions';

export default async function QuestionPages({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const initialPage = page ?? '1';
  return <Questions initialPage={initialPage} />;
}
