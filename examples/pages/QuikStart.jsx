import Markdown from '../components/markdown';

export default class QuikStart extends Markdown {
  // eslint-disable-next-line
  document() {
    return require('../docs/quikstart.md');
  }
}
