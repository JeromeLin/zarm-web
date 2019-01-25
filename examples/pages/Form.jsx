import Markdown from '../components/markdown';
import '../../components/form/style';
import '../../components/select/style';
import '../../components/input/style';
import '../../components/button/style';
import '../../components/calendar/style';
import '../../components/date-picker/style';
import '../../components/checkbox/style';
import '../../components/switch/style';
import '../../components/radio/style';
import '../../components/notification/style';
import '../../components/message/style';
import '../../components/layout/style';

export default class Form extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/form.md');
  }
}

