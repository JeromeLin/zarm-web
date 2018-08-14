import Markdown from '../components/markdown';
import Form from '../../components/Form';
import DatePicker from '../../components/DatePicker';
import '../../components/Form/style';
import '../../components/DatePicker/style';
import '../../components/Dropdown/style';
import '../../components/TimePicker/style';
import '../../components/Icon/style';

export default class TimePicker extends Markdown {
  // eslint-disable-next-line
  document () {
    return require('../docs/timepicker.md');
  }
}
