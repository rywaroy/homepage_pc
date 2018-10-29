import Loading from './loading';
import One from './one';
import Huaban from './huaban';
import Zhihu from './zhihu';
import Time from './time';
import Douban from './douban';
import Dytt from './dytt';
import Learn from './learn';
import Article from './article';

const Store = {
  loading: new Loading(),
  one: new One(),
  huaban: new Huaban(),
  zhihu: new Zhihu(),
  time: new Time(),
  douban: new Douban(),
  dytt: new Dytt(),
  learn: new Learn(),
  article: new Article(),
}

export default Store;