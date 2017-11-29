/**
 * @module horseman.js
 */
import { ConnectedResourceProvider as ResourceProvider } from './providers/ResourceProvider';
import prefetch from './providers/prefetch';
import horsemanReducer from './reducers/horsemanReducer';

export {
  horsemanReducer,
  prefetch,
  ResourceProvider,
};
