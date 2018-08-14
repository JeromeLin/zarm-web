import Markdown from '../components/markdown';
import '../../components/calendar/style';

export default class Calendar extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/calendar.md');
  }
}
