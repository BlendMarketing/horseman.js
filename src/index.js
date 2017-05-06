/**
 * @module horseman.js
 */
import * as craftActions from './actions/craftActions';
import * as wordpressActions from './actions/wordpressActions';

import RichText from './components/RichText';

import CraftEntryProvider from './providers/CraftEntryProvider';
import CraftCollectionProvider from './providers/CraftCollectionProvider';
import WordpressCollectionProvider from './providers/WordpressCollectionProvider';

import Reducers from './reducers/index';

const Actions = {
  craftActions,
  wordpressActions,
};

export {
  CraftEntryProvider,
  CraftCollectionProvider,
  WordpressCollectionProvider,
  RichText,
  Reducers,
  Actions,
};

