import { mount } from "@vue/test-utils";
import List from "@/components/List";
import { getList } from "@/services/axios"
import flushPromises from 'flush-promises'

jest.mock("@/services/axios");

describe('List items', () => {
    it('Error message box is invisible by default', () => {
        const wrapper = mount(List)
        expect(wrapper.find("#errors").isVisible()).toBe(false)
    });

    it("Displays error when empty list item is submitted.", async () => {
        const wrapper = mount(List)
        const input = wrapper.find('[data-testId="item-input"]')
        const button = wrapper.find('[data-testId="submit-button"]')

        input.setValue(" ")
        button.trigger('click')

        let errorPane = wrapper.find("#errors")
        expect(errorPane.isVisible()).toBe(true)
        expect(errorPane.html()).toContain("<p>Whoopsie! You seem to have forgotten to enter a new item.</p>")
    });
});

describe("API calls", function () {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    it("Calls getItems and displays the list", async () => {
        const mockResponse = '{{"item": "test item", "isCompleted": false}}'
        getList.mockResolvedValueOnce({text: mockResponse})
        const wrapper = mount(List)

        await flushPromises()
        const itemDisplay = wrapper.find('[data-testId="list-display"]')
        expect(itemDisplay.element.childElementCount).toEqual(1)
        expect(itemDisplay.html()).toContain("test item")
    });
});