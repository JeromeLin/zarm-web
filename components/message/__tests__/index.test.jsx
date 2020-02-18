import Message from "../index";
import toJson from "enzyme-to-json";

describe("MessageIndex", () => {
  const content = "This is a test messgae";
  const containCls = "zw-message-container";
  const customKey = "mykey";

  it("call api correctly", () => {
    Message.open({ content, key: customKey, stayTime: 1000 });
    Message.success(content);
    Message.warning(content);
    Message.info(content);
    Message.error(content);
    Message.loading(content);

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
