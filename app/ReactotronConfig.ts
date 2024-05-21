import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
  // controls connection & communication settings
  .configure({
    name: 'Gomi Calendar RN app',
  })
  // add all built-in react native plugins
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;
