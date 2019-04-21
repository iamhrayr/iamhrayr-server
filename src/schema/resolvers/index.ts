import merge from 'lodash/merge';

import work from './work';
import category from './category';
import skill from './skill';

// custom scalars
import customScalars from './customScalars';

export default merge(work, category, skill, customScalars);
