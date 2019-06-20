import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';

import 'codemirror/lib/codemirror.css';
import './style.scss';

export default class Editor extends Component {
  componentDidMount() {
    const { value } = this.props;

    this.cm = CodeMirror(this.editor, {
      mode: 'jsx',
      theme: 'react',
      keyMap: 'sublime',
      viewportMargin: Infinity,
      lineNumbers: false,
      dragDrop: false,
    });

    this.cm.setValue(value);
  }

  render() {
    return <div className="editor" ref={(ref) => { this.editor = ref; }} />;
  }
}

Editor.propTypes = {
  value: PropTypes.string,
};

Editor.defaultProps = {
  value: '',
};
