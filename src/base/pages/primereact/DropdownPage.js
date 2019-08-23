const BrowserState = require('BrowserState');
const BasePage = require('pages/BasePage');
const Dropdown = require('widgets/prime/Dropdown');

class DropdownPage extends BasePage {
    async open(url = 'https://www.primefaces.org/primereact/#/dropdown') {
        return await super.open(url);
    }

    async pageVerification() {
        return await BrowserState.getPage().waitForXPath("//h1[text()='Dropdown']", {visible: true});
    }

    async basicDropdown() {
        return await new Dropdown({xpath: "//h3[text()='Basic']/following-sibling::div[contains(@class, 'p-dropdown')][1]"});
    }

    async editableDropdown() {
        return await new Dropdown({xpath: "//h3[text()='Editable']/following-sibling::div[contains(@class, 'p-dropdown')][1]"});

    }
}

module.exports = DropdownPage;