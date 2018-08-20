import Markdown from '../components/markdown';
import '../../components/date-picker/style';

export default class DatePicker extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/datepicker.md');
  }
}
