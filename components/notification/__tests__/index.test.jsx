import Notification from "../index";

describe("NotificationIndex", () => {
  const content = "This is a test messgae";
  const title = "Test Title";
  const containCls = "zw-notification-container";
  const customKey = "mykey";

  it("call api correctly", () => {
    Notification.open({ title, content, key: customKey });
    Notification.success(content);
    Notification.warning(content);
    Notification.info(content);
    Notification.error(content);

    const dom = document.body.querySelector("." + containCls);
    expect(dom).not.toBe(null);
    expect(dom.children.length).toBe(5);

    Notification.closeAll();
    Notification.destroy();
    Notification.close(customKey);
  });
});
