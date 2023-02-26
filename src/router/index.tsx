import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '../components';
import { withPrivateRoute } from './withPrivateRoute';
import { RouterList } from './routerList';

import HomePage from '../pages/Home';
//import AboutPage from '../pages/About';
//const ServerErrorPage = lazy(() => import(/* webpackChunkName: "servererror" */ '../pages/ServerError'));
//const NotFoundPage = lazy(() => import(/* webpackChunkName: "notfound" */ '../pages/NotFound'));

export function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={RouterList.HOME}>
          <Route index element={<HomePage />} />
          <Route path={":category"} element={<HomePage />}>
            <Route path={":subcategory"} element={<HomePage />} />
          </Route>
          {/* 
          <Route path={RouterList.SERVER_ERROR} element={<ServerErrorPage />} />
          <Route path={RouterList.NOT_FOUND} element={<NotFoundPage />} />
          */}
        </Route>
      </Routes>
    </Suspense>
  );
}
