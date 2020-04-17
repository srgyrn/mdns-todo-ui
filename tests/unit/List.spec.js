import { mount } from "@vue/test-utils";
import List from "@/components/List";
import { getList, postItem } from "@/services/axios";
import flushPromises from "flush-promises";

jest.mock("@/services/axios");

describe("List items and API calls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Error message box is invisible by default", async () => {
    getList.mockResolvedValueOnce([]);
    const wrapper = mount(List);
    expect(wrapper.find("#errors").isVisible()).toBe(false);
  });

  it("Displays error when empty list item is submitted.", async () => {
    getList.mockResolvedValueOnce([]);

    const wrapper = mount(List);
    const input = wrapper.find('[data-testId="item-input"]');
    const button = wrapper.find('[data-testId="submit-button"]');

    input.setValue(" ");
    button.trigger("click");

    await wrapper.vm.$nextTick();

    const errorPane = wrapper.find("#errors");
    expect(errorPane.isVisible()).toBe(true);
    expect(errorPane.html()).toContain(
      "Whoopsie! You seem to have forgotten to enter a new item."
    );
  });

  it("Calls getList when loaded", async () => {
    getList.mockResolvedValueOnce([
      { id: 1, content: "test item", isCompleted: false }
    ]);

    const wrapper = mount(List);

    await flushPromises();
    expect(getList).toHaveBeenCalledTimes(1);

    const itemDisplay = wrapper.find('[data-testId="list-display"]');
    expect(itemDisplay.html()).toContain("test item");
  });

  it("Adds item", async () => {
    getList.mockResolvedValueOnce([]);
    postItem.mockResolvedValueOnce({
      id: 1,
      content: "test item",
      isCompleted: false
    });
    const wrapper = mount(List);
    await flushPromises();
    const input = wrapper.find('input[data-testId="item-input"]');
    const button = wrapper.find('button[data-testId="submit-button"]');

    input.setValue("test item");
    button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.find("#errors").isVisible()).toBe(false);
    expect(postItem).toHaveBeenCalledTimes(1);
  });
});
