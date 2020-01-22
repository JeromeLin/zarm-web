import Notification from "../index";

describe("NotificationIndex", () => {
  const message = "This is a test messgae";
  const title = "Test Title";
  const containCls = "zw-notification-container";
  const customKey = "mykey";

  it("call api correctly", () => {
    Notification.open({ title, message, key: customKey });
    Notification.success(message);
    Notification.warning(message);
    Notification.info(message);
    Notification.error(message);

    const dom = document.body.querySelector("." + containCls);
    expect(dom).not.toBe(null);
    expect(dom.children.length).toBe(5);

    Notification.closeAll();
    Notification.destroy();
    Notification.close(customKey);
  });
});
