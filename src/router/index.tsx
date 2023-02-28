import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '../components';
import { withPrivateRoute } from './withPrivateRoute';
import { RouterList } from './routerList';

import HomePage from '../pages/Home';
import BlockPage from '../pages/Block';
//import AboutPage from '../pages/About';
//const ServerErrorPage = lazy(() => import(/* webpackChunkName: "servererror" */ '../pages/ServerError'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "notfound" */ '../pages/NotFound'));

export function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={RouterList.HOME}>
          <Route index element={<HomePage />} />
          {/* 
          <Route path={RouterList.SERVER_ERROR} element={<ServerErrorPage />} />
          <Route path={RouterList.NOT_FOUND} element={<NotFoundPage />} />
          */}
        </Route>
          <Route path={'/ru'}>
            <Route index element={<HomePage />} />
            <Route path={"/ru/:category"}>
              <Route index element={<HomePage />} />
              <Route path={'/ru/:category/block'}>
                <Route index element={<NotFoundPage />} />
                <Route path={":blockId"} element={<BlockPage />} />
              </Route>
            </Route>
          </Route>
          <Route path={":category"}>
            <Route index element={<HomePage />} />
            <Route path={"/:category/block"} >
              <Route index element={<NotFoundPage />} />
              <Route path={":blockId"} element={<BlockPage />}>
              </Route>
            </Route>
          </Route>
          <Route path={"*"} element={<NotFoundPage />}>
          </Route>
      </Routes>
    </Suspense>
  );
}
