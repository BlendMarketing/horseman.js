/**
 * @module horseman.js
 */
import { ConnectedResourceProvider as ResourceProvider } from './providers/ResourceProvider';
import prefetch from './providers/prefetch';
import horsemanReducer from './reducers/horsemanReducer';
import horsemanRouteReducer from './reducers/horsemanRouteReducer';
import horsemanPaginationReducer from './reducers/horsemanPaginationReducer';

const horsemanReducers = {
  horsemanResources: horsemanReducer,
  horsemanRoutes: horsemanRouteReducer,
  horsemanPaginations: horsemanPaginationReducer,
};

export {
  horsemanReducers,
  prefetch,
  ResourceProvider,
};
