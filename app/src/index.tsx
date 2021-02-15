import { configErrorBoundary } from '@anchor-protocol/neumorphism-ui/components/configErrorBoundary';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { register } from './serviceWorkderRegistration';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn:
      'https://f33dd06d6f5948bfb06d809d0d0a274c@o247107.ingest.sentry.io/5636828',
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0,
  });

  configErrorBoundary(Sentry.ErrorBoundary);
}

ReactDOM.render(<App />, document.getElementById('root'));

register();
reportWebVitals();
