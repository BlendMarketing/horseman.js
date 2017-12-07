/**
 * @module horseman.js
 */
import { ConnectedResourceProvider as ResourceProvider } from './providers/ResourceProvider';
import prefetch from './providers/prefetch';
import horsemanReducer from './reducers/horsemanReducer';
import horsemanRouteReducer from './reducers/horsemanRouteReducer';

const horsemanReducers = {
  horsemanResources: horsemanReducer,
  horsemanRoutes: horsemanRouteReducer,
};

export {
  horsemanReducers,
  prefetch,
  ResourceProvider,
};
