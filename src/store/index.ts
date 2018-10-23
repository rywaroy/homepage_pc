import Loading from './loading';
import One from './one';
import Huaban from './huaban';
import Zhihu from './zhihu';
import Time from './time';
import Douban from './douban';
import Dytt from './dytt';

const Store = {
  loading: new Loading(),
  one: new One(),
  huaban: new Huaban(),
  zhihu: new Zhihu(),
  time: new Time(),
  douban: new Douban(),
  dytt: new Dytt(),
}

export default Store;