import Loading from './loading';
import One from './one';
import Huaban from './huaban';
import Zhihu from './zhihu';

const Store = {
  loading: new Loading(),
  one: new One(),
  huaban: new Huaban(),
  zhihu: new Zhihu(),
}

export default Store;