import merge from 'lodash/merge';

import work from './work';
import category from './category';
import skill from './skill';

export default merge(work, category, skill);
