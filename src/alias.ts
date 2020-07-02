import moduleAlias from 'module-alias';
import { isProduction } from './constants';

//
// Register alias
//
if (isProduction) {
  moduleAlias.addAlias('@', __dirname);
}
