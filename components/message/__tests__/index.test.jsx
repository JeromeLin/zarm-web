import Message from "../index";
import toJson from "enzyme-to-json";

describe("MessageIndex", () => {
  const message = "This is a test messgae";
  const containCls = "zw-message-container";
  const customKey = "mykey";

  it("call api correctly", () => {
    Message.open({ message, key: customKey, stayTime: 1000 });
    Message.success(message);
    Message.warning(message);
    Message.info(message);
    Message.error(message);
    Message.loading(message);

    let dom = document.body.querySelector("." + containCls);
    expect(dom).not.toBe(null);
    expect(dom.children.length).toBe(6);

    Message.close(customKey);
    Message.closeAll();
    Message.destroy();
    dom = document.body.querySelector("." + containCls);

    expect(dom).toBe(null);
  });
});
