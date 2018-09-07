import React from 'react';
import Select from '../../components/Select';
import '../../components/Select/style';
import InputTag from '../../components/InputWithTags';

console.log(InputTag);

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ss: [
        { key: "1", value: '111' },
        { key: "2", value: '222' },
      ],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // this.setState({
      //   ss: "你大二",
      // })
    }, 2000);
  }

  render() {
    return (
      <div
        style={{ width: 390, cursor: 'pointer' }}
        onClick={() => {
          this.setState({
            active: true,
          });
        }}
      >
        <InputTag
          radius
          placeholder="请选择"
          search
          active={this.state.active}
          value={this.state.ss}
          searchValue={this.state.searchValue}
          onSearchChange={(e) => {
            this.setState({ searchValue: e.target.textContent });
          }}
          onDeleteTag={(key, value, index) => {
            let arr = this.state.ss;
            arr.splice(index, 1);
            this.setState({
              ss: arr
            });
          }}
        />
      </div >
    );
  }
}
