import React from "react";
import { mapToIconType, mapToIconTheme, handleOptions } from "../utils";

describe("NotificationUtils", () => {
  it("map to icon type correctly", () => {
    expect(mapToIconType("success")).toBe("right-round-fill");
    expect(mapToIconType("error")).toBe("wrong-round-fill");
    expect(mapToIconType("warning")).toBe("warning-round-fill");
    expect(mapToIconType("info")).toBe("info-round-fill");
    expect(mapToIconType("others")).toBe(undefined);
  });

  it("map to icon theme correctly", () => {
    expect(mapToIconTheme("error")).toBe("danger");
    expect(mapToIconTheme("info")).toBe("primary");
    expect(mapToIconTheme("loading")).toBe("default");
    expect(mapToIconTheme("warning")).toBe("warning");
  });

  it("handle options correctly", () => {
    const message = "test message";
    const reactNode = <p>sss</p>;
    const options = { message };
    expect(handleOptions()).not.toBe(undefined);
    expect(handleOptions().message).toBe(undefined);
    expect(handleOptions(message).message).toBe(message);
    expect(handleOptions(reactNode).message).toBe(reactNode);
    expect(JSON.stringify(handleOptions(options))).toBe(
      JSON.stringify(options)
    );
  });
});
