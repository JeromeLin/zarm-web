## Table 表格
用于展示大量数据。

### 基础用法

:::demo 指定`columns`和`dataSource`属性。

```js
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: '1',
          name: '张三',
          dept: '直营部',
          age: 46,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市杨浦区四平路324号',
            comp: '1xxx公司'
          },
          state: true
        },
        {
          id: '2',
          name: '李四',
          dept: '健康险事业部',
          age: 32,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: 'aaaa',
            comp: '2xxx公司'
          },
          state: true
        },
        {
          id: '3',
          name: '王五',
          dept: '金融信保部',
          age: 20,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市浦东区张杨路1400号',
            comp: '3xxx公司'
          },
          state: false
        },
        {
          id: '4',
          name: '奥巴马',
          dept: '健康险事业部',
          age: 45,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '美国洛杉矶',
            comp: '2xxx公司'
          },
          state: false
        },
      ],
    }
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <Table
          striped
          // hover
          bordered
          dataSource={dataSource}
          columns={[{
            dataIndex: 'id',
            width: 50,
            render: (value, row, index) => {
              return index + 1;
            }
          },{
            title: '姓名',
            dataIndex: 'name',
            width: 100,
            render: (value, row, index) => {
              return <a href="javascript:;">{value}</a>;
            },
            sorter: (a, b) => {
              return a.name.localeCompare(b.name);
            }
          },{
            title: '部门',
            dataIndex: 'dept',
            width: 130,
            render: (value, row, index) => {
              return (
                <Select size="sm" value={value} style={{width: 130}}>
                  <Select.Option value="直营部">直营部</Select.Option>
                  <Select.Option value="健康险事业部">健康险事业部</Select.Option>
                  <Select.Option value="金融信保部">金融信保部</Select.Option>
                  <Select.Option value="人力资源部">人力资源部</Select.Option>
                </Select>
              );
            },
            sorter: (a, b) => {
              return a.dept.localeCompare(b.dept);
            }
          },{
            title: '年龄',
            dataIndex: 'age',
            width: 80,
            render: (value, row, index) => {
              return <Input size="sm" style={{width: 40}} value={value} maxLength="3" onChange={(e) => {
                let dataSource = this.state.dataSource;
                dataSource[index].age = e.target.value;
                this.setState({dataSource});
              }}/>;
            },
            sorter: (a, b) => {
              return a.age - b.age;
            }
          },{
            title: '家庭住址',
            dataIndex: 'address',
            render: (value, row, index) => {
              return value.home
            }
          },
          {
            title: '公司地址',
            dataIndex: 'address',
            render: (value, row, index) => {
              return value.comp
            }
          },{
            title: '状态',
            dataIndex: 'state',
            width: 100,
            render: (value, row, index) => {
              return <Switch size="sm" value={value} />;
            },
            sorter: (a, b) => {
              return a.state - b.state;
            }
          },{
            title: '操作',
            dataIndex: 'op',
            width: 120,
            render: (value, row, index) => {
              return (
                <div style={{color: '#ccc'}}>
                  <a href="javascript:;" onClick={(e) => {
                    e.stopPropagation();  //避免触发rowClick事件
                    alert('编辑')
                  }}>编辑</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="javascript:;" onClick={(e) => {
                    e.stopPropagation();  //避免触发rowClick事件
                    alert('删除')
                  }}>删除</a>
                </div>
              );
            }
          }]}
          rowClick={(row) => {
            console.log(row);
          }}
          rowClassName={(row) => {
            if(row.age == 46) {
              return 'bg'
            }
          }}
          rowSelection={{
            // value: this.state.tableSelection,
            onSelect: (selected, row, selectedRows) => {
              console.log(selected, row, selectedRows);
              let tableSelection = this.state.tableSelection;
              tableSelection = selectedRows;
              this.setState({tableSelection});
            },
            onSelectAll: (selected, selectedRows) => {
              console.log(selected, selectedRows);
              let tableSelection = this.state.tableSelection;
              tableSelection = selectedRows;
              this.setState({tableSelection});
            }
          }}>
        </Table>
      </div>
    )
  }
```
:::

### 固定操作列

:::demo 指定`fixed`属性。

```js
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: '1',
          name: '张三',
          dept: '直营部',
          age: 46,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市杨浦区四平路324号上海市杨浦区四平路324号上海市杨浦区四平路324号上海市杨浦区四平路324号',
            comp: '1xxx公司'
          },
          state: true
        },
        {
          id: '2',
          name: '李四',
          dept: '健康险事业部',
          age: 32,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: 'aaaa',
            comp: '2xxx公司'
          },
          state: true
        },
        {
          id: '3',
          name: '王五',
          dept: '金融信保部',
          age: 20,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市浦东区张杨路1400号',
            comp: '3xxx公司'
          },
          state: false
        },
        {
          id: '4',
          name: '奥巴马',
          dept: '健康险事业部',
          age: 45,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '美国洛杉矶',
            comp: '2xxx公司'
          },
          state: false
        },
      ],
    }
  }
  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <Table
          // striped
          hover
          dataSource={dataSource}
          columns={[{
            dataIndex: 'id',
            width: 50,
            render: (value, row, index) => {
              return index + 1;
            }
          },{
            title: '姓名',
            dataIndex: 'name',
            width: 100,
            render: (value, row, index) => {
              return <a href="javascript:;">{value}</a>;
            },
            sorter: (a, b) => {
              return a.name.localeCompare(b.name);
            }
          },{
            title: '部门',
            dataIndex: 'dept',
            width: 130,
            render: (value, row, index) => {
              return (
                <Select size="sm" value={value} style={{width: 130}}>
                  <Select.Option value="直营部">直营部</Select.Option>
                  <Select.Option value="健康险事业部">健康险事业部</Select.Option>
                  <Select.Option value="金融信保部">金融信保部</Select.Option>
                  <Select.Option value="人力资源部">人力资源部</Select.Option>
                </Select>
              );
            },
            sorter: (a, b) => {
              return a.dept.localeCompare(b.dept);
            }
          },{
            title: '年龄',
            dataIndex: 'age',
            width: 80,
            render: (value, row, index) => {
              return <Input size="sm" style={{width: 40}} value={value} maxLength="3" onChange={(e) => {
                let dataSource = this.state.dataSource;
                dataSource[index].age = e.target.value;
                this.setState({dataSource});
              }}/>;
            },
            sorter: (a, b) => {
              return a.age - b.age;
            }
          },{
            title: '家庭住址',
            dataIndex: 'address',
            render: (value, row, index) => {
              return value.home
            }
          },
          {
            title: '公司地址',
            dataIndex: 'address',
            render: (value, row, index) => {
              return value.comp
            }
          },{
            title: '状态',
            dataIndex: 'state',
            width: 100,
            render: (value, row, index) => {
              return <Switch size="sm" value={value} />;
            },
            sorter: (a, b) => {
              return a.state - b.state;
            }
          },{
            title: '操作',
            dataIndex: 'op',
            fixed: 'right',
            width: 120,
            render: (value, row, index) => {
              return (
                <div style={{color: '#ccc'}}>
                  <a href="javascript:;" onClick={(e) => {
                    e.stopPropagation();  //避免触发rowClick事件
                    alert('编辑')
                  }}>编辑</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="javascript:;" onClick={(e) => {
                    e.stopPropagation();  //避免触发rowClick事件
                    alert('删除')
                  }}>删除</a>
                </div>
              );
            }
          }]}
          rowClick={(row) => {
            console.log(row);
          }}
          rowClassName={(row) => {
            if(row.age == 46) {
              return 'bg'
            }
          }}
          rowSelection={{
            fixed: true,
            onSelect: (selected, row, selectedRows) => {
              console.log(selected, row, selectedRows);
              let tableSelection = this.state.tableSelection;
              tableSelection = selectedRows;
              this.setState({tableSelection});
            },
            onSelectAll: (selected, selectedRows) => {
              console.log(selected, selectedRows);
              let tableSelection = this.state.tableSelection;
              tableSelection = selectedRows;
              this.setState({tableSelection});
            }
          }}>
        </Table>
      </div>
    )
  }
```
:::

### 表头分组和单元格合并

:::demo

```js
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: '1',
          name: '张三',
          dept: '直营部',
          age: 46,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市杨浦区四平路324号',
            comp: '1xxx公司'
          },
          state: true
        },
        {
          id: '2',
          name: '李四',
          dept: '健康险事业部',
          age: 32,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: 'aaaa',
            comp: '2xxx公司'
          },
          state: true
        },
        {
          id: '3',
          name: '王五',
          dept: '金融信保部',
          age: 20,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市浦东区张杨路1400号',
            comp: '3xxx公司'
          },
          state: false
        },
        {
          id: '4',
          name: '奥巴马',
          dept: '健康险事业部',
          age: 45,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '美国洛杉矶',
            comp: '2xxx公司'
          },
          state: false
        },
      ],
    }
  }
  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <Table
          // hover
          bordered
          dataSource={dataSource}
          columns={[{
            dataIndex: 'id',
            width: 50,
            render: (value, row, index) => {
              return index + 1;
            }
          },{
            title: '姓名',
            dataIndex: 'name',
            width: 100,
            render: (value, row, index) => {
              return <a href="javascript:;">{value}</a>; 
            },
            sorter: (a, b) => {
              return a.name.localeCompare(b.name);
            }
          },{
            title: '联系方式',
            dataIndex: 'contact',
            children: [
              {
                title: '手机',
                dataIndex: 'mobile',
                children: [
                  {
                    title: 'iphone',
                    dataIndex: 'iphone',
                    render: (value, row, index) => {
                      {/* colSpan例子 */}
                      if (index === 1) {
                        return {
                          value,
                          colSpan: 2
                        }
                      }
                      return value;
                    }
                  },
                  {
                    title: 'android',
                    dataIndex: 'android',
                    render: (value, row, index) => {
                      {/* colSpan例子 */}
                      if (index === 1) {
                        return {
                          colSpan: 0
                        }
                      }
                      return value;
                    }
                  }
                ]
              },
              {
                title: '固话',
                dataIndex: 'tel'
              }
            ]
          },{
            title: '家庭住址',
            dataIndex: 'address',
            render: (value, row, index) => {
              {/* rowSpan例子 */}
              if (index === 1) {
                return {
                  value: value.home,
                  rowSpan: 2
                }
              }
              if (index === 2) {
                return {
                  rowSpan: 0
                }
              }
              return value.home
            }
          },
          {
            title: '公司地址',
            dataIndex: 'address',
            render: (value, row, index) => {
              return value.comp
            }
          },{
            title: '状态',
            dataIndex: 'state',
            width: 100,
            render: (value, row, index) => {
              return <Switch size="sm" value={value} />;
            },
            sorter: (a, b) => {
              return a.state - b.state;
            }
          },{
            title: '操作',
            dataIndex: 'op',
            width: 120,
            render: (value, row, index) => {
              return (
                <div style={{color: '#ccc'}}>
                  <a href="javascript:;" onClick={(e) => {
                    e.stopPropagation();  //避免触发rowClick事件
                    alert('编辑');
                  }}>编辑</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="javascript:;" onClick={(e) => {
                    e.stopPropagation();  //避免触发rowClick事件
                    alert('删除');
                  }}>删除</a>
                </div>
              );
            }
          }]}
          rowClick={(row) => {
            console.log(row);
          }}
          rowSelection={{
            // value: this.state.tableSelection,
            onSelect: (selected, row, selectedRows) => {
              console.log(selected, row, selectedRows);
              let tableSelection = this.state.tableSelection;
              tableSelection = selectedRows;
              this.setState({tableSelection});
            },
            onSelectAll: (selected, selectedRows) => {
              console.log(selected, selectedRows);
              let tableSelection = this.state.tableSelection;
              tableSelection = selectedRows;
              this.setState({tableSelection});
            }
          }}>
        </Table>
      </div>
    )
  }
```
:::


### 可展开行

:::demo 指定`columns`和`dataSource`属性。

```js
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          id: '1',
          name: '张三',
          dept: '直营部',
          age: 46,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市杨浦区四平路324号',
            comp: '1xxx公司'
          },
          state: true
        },
        {
          id: '2',
          name: '李四',
          dept: '健康险事业部',
          age: 32,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: 'aaaa',
            comp: '2xxx公司'
          },
          state: true
        },
        {
          id: '3',
          name: '王五',
          dept: '金融信保部',
          age: 20,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市浦东区张杨路1400号',
            comp: '3xxx公司'
          },
          state: false
        },
        {
          id: '4',
          name: '奥巴马',
          dept: '健康险事业部',
          age: 45,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '美国洛杉矶',
            comp: '2xxx公司'
          },
          state: false
        },
      ],
    }
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <Table
          // bordered
          hover
          onExpand={(expanded, row) => {
            console.log(expanded);
            console.log(row);
          }}
          expandedRowRender={(row, index) => {
            return (
              <div style={{ width: 600 }}>
                <div>第 {index + 1} 行数据：</div>
                <div><pre>{JSON.stringify(row)}</pre></div>
              </div>
            );
          }}
          expandedRowKeys={[0]}
          dataSource={dataSource}
          columns={[{
            dataIndex: 'id',
            width: 50,
            render: (value, row, index) => {
              return index + 1;
            }
          },{
            title: '姓名',
            dataIndex: 'name',
            width: 100,
            render: (value, row, index) => {
              return <a href="javascript:;">{value}</a>;
            },
            sorter: (a, b) => {
              return a.name.localeCompare(b.name);
            }
          },{
            title: '部门',
            dataIndex: 'dept',
            width: 130,
            render: (value, row, index) => {
              return (
                <Select size="sm" value={value} style={{width: 130}}>
                  <Select.Option value="直营部">直营部</Select.Option>
                  <Select.Option value="健康险事业部">健康险事业部</Select.Option>
                  <Select.Option value="金融信保部">金融信保部</Select.Option>
                  <Select.Option value="人力资源部">人力资源部</Select.Option>
                </Select>
              );
            },
            sorter: (a, b) => {
              return a.dept.localeCompare(b.dept);
            }
          },{
            title: '年龄',
            dataIndex: 'age',
            width: 80,
            render: (value, row, index) => {
              return <Input size="sm" style={{width: 40}} value={value} maxLength="3" onChange={(e) => {
                let dataSource = this.state.dataSource;
                dataSource[index].age = e.target.value;
                this.setState({dataSource});
              }}/>;
            },
            sorter: (a, b) => {
              return a.age - b.age;
            }
          },{
            title: '家庭住址',
            dataIndex: 'address',
            render: (value, row, index) => {
              return value.home
            }
          },
          {
            title: '公司地址',
            dataIndex: 'address',
            render: (value, row, index) => {
              return value.comp
            }
          },{
            title: '状态',
            dataIndex: 'state',
            width: 100,
            render: (value, row, index) => {
              return <Switch size="sm" value={value} />;
            },
            sorter: (a, b) => {
              return a.state - b.state;
            }
          },{
            title: '操作',
            dataIndex: 'op',
            width: 120,
            render: (value, row, index) => {
              return (
                <div style={{color: '#ccc'}}>
                  <a href="javascript:;" onClick={(e) => {
                    e.stopPropagation();  //避免触发rowClick事件
                    alert('编辑')
                  }}>编辑</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="javascript:;" onClick={(e) => {
                    e.stopPropagation();  //避免触发rowClick事件
                    alert('删除')
                  }}>删除</a>
                </div>
              );
            }
          }]}
          rowClick={(row) => {
            console.log(row);
          }}
          rowSelection={{
            // value: this.state.tableSelection,
            onSelect: (selected, row, selectedRows) => {
              console.log(selected, row, selectedRows);
              let tableSelection = this.state.tableSelection;
              tableSelection = selectedRows;
              this.setState({tableSelection});
            },
            onSelectAll: (selected, selectedRows) => {
              console.log(selected, selectedRows);
              let tableSelection = this.state.tableSelection;
              tableSelection = selectedRows;
              this.setState({tableSelection});
            }
          }}>
        </Table>
      </div>
    )
  }
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| columns   |  表格字段  | object[] |   -  |    []  |
| dataSource  |  表格数据  | object[] |   -  |    []  |
| bordered   |  是否带边框  | boolean |   -  |    false |
| radius   |  是否圆角  | boolean |   -  |    false  |
| striped   |  是否间隔变色  | boolean |   -  |    false  |
| isLoading   |  是否加载中  | boolean |   -  |    false  |
| maxCellSize   |  单元格最多显示字符数，超过显示...  | number |   -  |    20  |
| rowSelection  |  选中行配置 | object |   -  |    -  |
| defaultExpandAllRows  | 是否展开所有行 | boolean |   -  |    false  |
| defaultExpandedRowKeys  | 默认展开所有行 | string[] / number[] |   -  |    -  |
| expandedRowKeys  | 展开的行，控制属性 | string[] / number[] |   -  |    -  |
| expandedRowRender  | 展开行渲染函数 | (row, index) => ReactNode |   -  |    -  |
| rowClassName  | 筛选行添加样式 | (row) => string |   -  |    -  |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| rowClick | 点击row触发的事件 |  row |
| onExpand | 点击展开行icon触发的事件 |  (expanded, row) |