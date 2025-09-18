import { Questions } from '@/widgets/questions';
import { cookies } from 'next/headers';
export default async function QuestionPages() {
  const cookieStore = await cookies();
  const initialPage = cookieStore.get('currentPage')?.value || '1';

  return <Questions initialPage={initialPage} />;
}
