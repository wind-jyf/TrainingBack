import { devConfig } from './devConf';
import { proConfig } from './proConf';

import { isProduction } from '@/constants';

export const config = isProduction ? proConfig : devConfig;