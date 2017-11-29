import { matchPath } from 'react-router-dom';
import ParseEndpoint from './ParseEndpoint';

const getRoutePreloadData = (routes, path) => {
  let data = '';
  routes.forEach((route) => {
    const routeInfo = { path: route.props.path, exact: route.props.exact };
    const match = matchPath(path, routeInfo);
    if (match && typeof route.props.data !== 'undefined') {
      const params = match.params;
      params.url = match.url;
      data = ParseEndpoint(route.props.data, params);
    }
  });

  return data === '' ? null : data;
};
export default getRoutePreloadData;
