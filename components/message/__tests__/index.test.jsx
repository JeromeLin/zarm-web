import Message from '../index';

describe('MessageIndex', () => {
  const content = 'This is a test messgae';
  const containCls = 'zw-message-container';
  const key = 'mykey';

  it('call api correctly', () => {
    Message.success(content);
    Message.warning(content);
    Message.info(content);
    Message.error(content);
    Message.error({ content, stayTime: 3000 });
    Message.loading(content);
    Message.loading({ content, key, stayTime: 0 });

    let dom = document.body.querySelector(`.${containCls}`);
    expect(dom).not.toBe(null);
    expect(dom.children.length).toBe(7);

    Message.close(key);
    Message.closeAll();
    Message.destroy();
    dom = document.body.querySelector(`.${containCls}`);

    expect(dom).toBe(null);
  });
});
