import { ErrorComponent } from '@/components/building-blocks/error-component/error-component';
import { ReactNode } from 'react';
import { useLocation } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';

interface WithErrorHandlingProps<T> {
  queryData?: {
    isError: boolean;
    errorMessage?: string;
    data?: T;
  };
  render: (data: T) => ReactNode;
}

function WithErrorHandlingInternal<T>({ queryData, render }: WithErrorHandlingProps<T>) {
  const location = useLocation();

  if (!queryData) {
    return null;
  }

  if (queryData.isError) {
    console.error(`Error in route ${location.pathname}:`, queryData.errorMessage);
    return <ErrorComponent errorMessage={queryData.errorMessage} />;
  }

  if (!queryData.data) {
    return null;
  }

  return render(queryData.data);
}

export function WithErrorHandling<T>(props: WithErrorHandlingProps<T>) {
  return <ClientOnly fallback={<></>}>{() => <WithErrorHandlingInternal {...props} />}</ClientOnly>;
}
