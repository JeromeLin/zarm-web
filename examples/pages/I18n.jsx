import Markdown from '../components/markdown';

export default class I18n extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/i18n.md');
  }
}
