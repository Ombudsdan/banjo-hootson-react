import { Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';
import { ErrorBoundary } from 'framework';

import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);

// Mark body as loaded after initial paint to trigger CSS fade-in
requestAnimationFrame(() => document.body.classList.add('loaded'));
