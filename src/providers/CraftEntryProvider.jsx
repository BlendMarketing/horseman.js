import { connect } from 'react-redux';

import EntryProvider from './EntryProvider';
import ParseEndpoint from '../ParseEndpoint';
import { fetchEntryFactory } from '../ActionFactory';

/**
 * A Craft entry needs to have access to the information about the entry it is
 * fetching. The route should tell this component what that data is.
 */
const mapStateToProps = (state, ownProps) => {
  const entryUrl = ParseEndpoint(ownProps.endpoint, ownProps.match.params);

  return {
    entryUrl,
    entry: state.horsemanEntries[entryUrl] || { loading: true },
  };
};

/**
 * The component needs to be able to fetch the entry we want.
 */
const mapDispatchToProps = dispatch => ({
  getEntry: uri => dispatch(fetchEntryFactory('@@horseman/ADD_CRAFT_ENTRY')(uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryProvider);
