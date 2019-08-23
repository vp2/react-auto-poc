const BrowserState = require('BrowserState');
const BasePage = require('pages/BasePage');
const WebWidget = require('widgets/WebWidget');

class InputPage extends BasePage {
    async open(url = 'https://www.primefaces.org/primereact/#/inputtext') {
        return await super.open(url);
    }

    async pageVerification() {
        return await BrowserState.getPage().waitForXPath("//h1[text()='InputText']", {visible: true});
    }

    async basicInputText() {
        // return new WebWidget({xpath: "//input[contains(@class, 'p-inputtext')]"});
        return await new WebWidget({xpath: "//h3[text()='Basic']/following-sibling::input[contains(@class, 'p-inputtext')][1]"});
        // return await new WebWidget({css: ".p-inputtext"});
    }

    async floatingLabelText() {
        return await new WebWidget({xpath: "//input[@id=(//label[normalize-space(.)='Username']/@for)]"})
    }
}

module.exports = InputPage;