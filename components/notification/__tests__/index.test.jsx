import Notification from '../index';

describe('NotificationIndex', () => {
  afterEach(() => {
    // document.body.innerHTML = '';
  });

  const content = 'This is a test messgae';
  const title = 'Test Title';
  const containCls = 'zw-notification-container';
  const customKey = 'mykey';

  it('call api correctly', () => {
    Notification.open({ title, content, key: customKey });
    Notification.success(content);
    Notification.warning(content);
    Notification.info(content);
    Notification.error(content);

    const dom = document.body.querySelector(`.${containCls}`);
    expect(dom).not.toBe(null);
    expect(dom.children.length).toBe(5);

    Notification.closeAll();
    Notification.destroy();
    Notification.close(customKey);
  });

  it('render/update notification with custom key correctly', () => {
    jest.useFakeTimers();

    Notification.info({
      content,
      key: 'mykey',
    });

    const container = document.querySelector(`.${containCls}`);
    const oldel = container.querySelector('[class*="info-round-fill"]');
    expect(oldel).not.toBeNull();

    let newel = container.querySelector('[class*="right-round-fill"]');
    expect(newel).toBeNull();

    setTimeout(() => {
      Notification.success({
        content,
        key: 'mykey',
      });
    }, 2000);

    jest.advanceTimersByTime(3000);

    newel = container.querySelector('[class*="right-round-fill"]');
    expect(newel).not.toBeNull();
  });
});
