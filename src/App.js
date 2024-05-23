import React, { Suspense } from 'react'
import { Switch, Route, AuthRoute, NotFound } from '@fs/zion-router'
import ErrorBoundary from '@fs/zion-error-boundary'
import HomePageSkeleton from './pages/HomePage/HomePageSkeleton'

// Dynamically load components to reduce bundle size
// https://reactjs.org/docs/react-api.html#reactlazy

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const VendingMachine = React.lazy(() => import('./pages/VendingMachine/VendingMachine'))
const DadJokes = React.lazy(() => import('./pages/DadJokes/DadJokes'))

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<HomePageSkeleton />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <AuthRoute path="/vending-machine" component={VendingMachine} />
          <Route path="/dad-jokes" component={DadJokes} />

          {/* blank page for performance testing purposes only */}
          <Route path="/blank" component={() => 'This page is intentionally left blank'} />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}
export default App
