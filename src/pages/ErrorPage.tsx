import { AlertCard, PageContainer, PageContentContainer, PageHeading, PageSectionContainer } from 'framework';

const DEFAULT_TITLE = 'Something went wrong';
const DEFAULT_MESSAGE = 'An unexpected error occurred. Please try again.';

export default function ErrorPage(props: ErrorPageProps) {
  const { error } = props;
  const { title, message } = getContent(props);
  const errorDetails = process.env.NODE_ENV !== 'production' && getErrorDetails();

  return (
    <main>
      <PageHeading heading={title} />
      <PageContainer>
        <PageContentContainer spacing="small">
          <PageSectionContainer>
            <AlertCard variant="error" heading={message} id="error-details">
              {errorDetails && (
                <>
                  <details>
                    <summary>Error Details</summary>
                    <pre>{errorDetails}</pre>
                  </details>
                </>
              )}
            </AlertCard>
          </PageSectionContainer>
          <PageSectionContainer>
            <button onClick={clickGoHome} className="button button--primary">
              Go Home
            </button>
          </PageSectionContainer>
        </PageContentContainer>
      </PageContainer>
    </main>
  );

  function getContent(props: ErrorPageProps) {
    let title = props.title;
    let message = props.message;

    if (title && message) return { title, message };

    const paramsContent = getContentFromParams();
    const networkErrorContent = getContentFromNetworkError(props.error);

    title = paramsContent.title || networkErrorContent?.title || DEFAULT_TITLE;
    message = paramsContent.message || networkErrorContent?.message || DEFAULT_MESSAGE;

    return { title, message };
  }

  function getContentFromParams(): Partial<IError> {
    const params = typeof window !== 'undefined' && new URLSearchParams(window.location.search);

    if (!params) return { title: undefined, message: undefined };

    return {
      title: params.get('title') || undefined,
      message: params.get('message') || undefined
    };
  }

  function getContentFromNetworkError(err: unknown): Partial<IError> {
    const error = err as CustomErrorProps;
    const call = error?.context || error?.call;
    const isNetwork = error?.code === 'NETWORK_ERROR' || (error instanceof Error && error.message === 'Network error');

    if (!isNetwork) return {};

    return {
      title: 'Network Error',
      message: `Could not access ${
        call || 'the API'
      }. \n\n Check that Banjo Hootson API is running and your network connection is active.`
    };
  }

  function getErrorDetails() {
    if (error instanceof Error) return error.stack || error.message;
    if (typeof error === 'string') return error;
    try {
      return JSON.stringify(error);
    } catch {
      return String(error ?? '');
    }
  }

  function clickGoHome() {
    if (typeof window === 'undefined') return;
    window.location.href = '/';
  }
}

type CustomErrorProps = Partial<Error> & { context?: string; call?: string; code?: string };

interface IError {
  title: string;
  message: string;
}

type ErrorPageProps = Partial<IError> & { error?: unknown };
