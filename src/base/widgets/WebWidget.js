const BrowserState = require('BrowserState');
const cssToXPath = require('css-to-xpath');

class WebWidget {
    constructor(options = {}) {
        this.css = options.css || null;
        this.xpath = options.xpath || null;
        if (!this.css && !this.xpath) {
            throw new Error('No selector defined');
        }
        if (this.css && this.xpath) {
            throw new Error('Only CSS or XPath selector should be defined');
        }
    }

    rootXPath() {
        if (this.css) {
            return this.cssToXPath(this.css);
        } else {
            return this.xpath;
        }
    }

    cssToXPath(css) {
        return cssToXPath(css).replace(/^\./, '');
    }

    getXPathFromRelative(opt = {}) {
        if (opt.css) {
            return `(${this.rootXPath()})${this.cssToXPath(opt.css)}`;
        }
        if (opt.xpath) {
            return `(${this.rootXPath()})${opt.xpath}`;
        }
        throw new Error("Either css or xpath should be defined");
    }

    async getElementCountByXPath(xpath) {
        const elements = await (this.getAll(this.getXPathFromRelative({xpath: xpath})));
        return elements.length;
    }

    async getAll(xpath) {
        return await (await BrowserState.getPage()).$x(xpath);
    }

    async getFirst(xpath) {
        return (await this.getAll(xpath)).shift();
    }

    async click(options = {}) {
        return await (await this.getFirst(this.rootXPath())).click(options);
    }

    async clickRight(options = {}) {
        return await this.click([...new Set([...options, ...{button: 'right'}])]);
    }

    async setText(text, options = {}) {
        return await (await this.getFirst(this.rootXPath())).type(text, options);
    }

    async getText() {
        return await (await this.getFirst(this.rootXPath())).getProperty('textContent');
    }

    async clearText() {
        // todo: JS settext?
    }
}

module.exports = WebWidget;