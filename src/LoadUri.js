import { matchPath } from 'react-router-dom';
import ParseEndpoint from './ParseEndpoint';

const LoadUri = (routes, path) => {
  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];
    const routeInfo = { path: route.props.path, exact: route.props.exact };
    const match = matchPath(path, routeInfo);
    if (match) {
      if (typeof route.props.data !== 'undefined') {
        const params = match.params;
        params.url = match.url;
        return ParseEndpoint(route.props.data, params);
      }
    }
  }
  return false;
};
export default LoadUri;
