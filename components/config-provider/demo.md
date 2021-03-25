# ConfigProvider 全局配置

## 基本用法

```jsx
import { useState } from 'react';
import { ConfigProvider, Button, Popconfirm, Radio, Message } from 'zarm-web';
import enUS from 'zarm-web/config-provider/locale/en_US';
import zhCN from 'zarm-web/config-provider/locale/zh_CN';

const Demo = () => {
  const [locale, setLocale] = useState(GlobalContext.locale);

  return (
    <ConfigProvider locale={locale === 'enUS' ? enUS : zhCN}>
      <>
        <Radio.Group compact type="button" value={locale} onChange={setLocale}>
          <Radio value="zhCN">中文</Radio>
          <Radio value="enUS">EN</Radio>
        </Radio.Group>

        <Popconfirm content="Are you sure delete this task?">
          <Button theme="default">Delete</Button>
        </Popconfirm>
      </>
    </ConfigProvider>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型              | 默认值    | 说明                                                                                                                                |
| :----------- | :---------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| locale       | Object            | -         | 语言包配置，默认为中文，语言包可到 [zarm/lib/config-provider/locale](https://unpkg.com/zarm/lib/config-provider/locale/) 目录下寻找 |
| theme        | 'light' \| 'dark' | 'light'   | 主题模式，光亮主题 和 暗黑主题的切换                                                                                                |
| primaryColor | string            | '#00bc70' | 品牌标准色                                                                                                                          |
