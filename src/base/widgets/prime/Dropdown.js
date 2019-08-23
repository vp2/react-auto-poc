const BrowserState = require('BrowserState');
const WebWidget = require('widgets/WebWidget');

/**
 * Dropdown component.
 * https://www.primefaces.org/primereact/#/dropdown
 *
 * Root selector should always point to <div class="p-dropdown p-component">
 */
class Dropdown extends WebWidget {
    async clickTrigger() {
        const xpath = this.getXPathFromRelative({css: '.p-dropdown-trigger-icon'});
        const el = await (await this.getFirst(xpath));
        return await el.click();
    }

    async openDropdown() {
        const xpath = this.getXPathFromRelative({css: '.p-dropdown-panel'});
        const el = await (await this.getFirst(xpath));
        const className = await (await el.getProperty('className')).jsonValue();
        if (className.indexOf('p-input-overlay-visible') < 0) {
            return await this.clickTrigger();
        }
    }

    async closeDropdown() {
        const xpath = this.getXPathFromRelative({css: '.p-dropdown-panel'});
        const el = await (await this.getFirst(xpath));
        const className = await (await el.getProperty('className')).jsonValue();
        if (className.indexOf('p-input-overlay-visible') >= 0) {
            return await this.clickTrigger();
        }
    }

    async getItems() {
        const elements = await this.getAll(this.getXPathFromRelative({css: 'ul.p-dropdown-items > li.p-dropdown-item'}));
        let items = [];
        for (let i = 0; i < elements.length; i++) {
            items.push(await (await (await elements[i].getProperty('textContent')).jsonValue()).trim());
        }
        return items;
    }

    /**
     *
     * @param itemText
     * @return {Promise<*>}
     */
    async selectItem(itemText) {
        await this.openDropdown();
        const xpath = this.getXPathFromRelative({xpath: `//li[contains(@class, 'p-dropdown-item') and normalize-space(.)='${itemText}']`});
        console.log(xpath);
        await BrowserState.getPage().waitForXPath(xpath, {visible: true, timeout: 5000});
        const el = await (await this.getFirst(xpath));
        return await el.click()
    }

    async getSelection() {
        const xpath = this.getXPathFromRelative({xpath: "//*[contains(@class, 'p-dropdown-label')]"});
        const el = await this.getFirst(xpath);
        let tagName = (await el.getProperty('tagName')).toString();
        console.log("tagName=" + tagName);
        if (tagName == 'JSHandle:LABEL') {
            return await (await el.getProperty('textContent')).jsonValue();
        } else if (tagName == 'JSHandle:INPUT') {
            return await (await el.getProperty('value')).jsonValue();
        } else {
            throw new Error(`Unrecognized tag "${tagName}"`);
        }
    }

    async isEditable() {
        const count = await (await this.getElementCountByXPath("//input[contains(@class, 'p-inputtext') and not(contains(@class, 'p-dropdown-filter'))]"));
        return count === 1;
    }

    async isFilterable() {
        let count = await (await this.getElementCountByXPath("//input[contains(@class, 'p-dropdown-filter')]"));
        return count === 1;
    }

    async setFilterText(filterText, options = {}) {
        const xpath = this.getXPathFromRelative({css: 'input.p-dropdown-filter'});
        const el = await (await this.getFirst(xpath));
        return await el.type(filterText, options);
    }

    async isClearable() {
        // todo: <i> with class 'p-dropdown-clear-icon' exists (removed from DOM on click)
        const count = await (await this.getElementCountByXPath("//i[contains(@class, 'p-dropdown-clear-icon')]"));
        return count === 1;
    }

    async clickClearButton() {
        const xpath = this.getXPathFromRelative({xpath: "//i[contains(@class, 'p-dropdown-clear-icon')]"});
        const el = await (await this.getFirst(xpath));
        return await el.click();
    }

    async setText(text, options = {}) {
        const xpath = this.getXPathFromRelative({css: 'input.p-dropdown-label'});
        const el = await (await this.getFirst(xpath));
        return await el.type(text, options);
    }
}

module.exports = Dropdown;