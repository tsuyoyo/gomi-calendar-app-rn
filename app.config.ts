import 'ts-node/register';

import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  if (process.env.MY_ENVIRONMENT === 'production') {
    return {
      ...config,
      slug: 'narashino-city-trash-collection-app',
      name: '習志野市ごみ収集',
    };
  } else {
    return {
      ...config,
      slug: 'narashino-city-trash-collection-app',
      name: '習志野市ごみdev',
    };
  }
};
