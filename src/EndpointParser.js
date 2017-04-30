export const ParseEndpoint = (endpoint, options) => {

  const params = endpoint.match(/:[a-z0-9]+/g);
  let parsedEndpoint = endpoint;

  if (!params) {
    return endpoint;
  }

  params.forEach((param) => {
    const cleanParam = param.replace(':', '');
    parsedEndpoint = parsedEndpoint.replace(param, options[cleanParam]);
  });

  return parsedEndpoint;
};
