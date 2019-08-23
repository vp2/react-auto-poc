const puppeteer = require('puppeteer');

class BrowserState {
    constructor() {
        BrowserState.init();
    }

    static init() {
        this.instance = {
            browser: null,
            page: null
        }
    }

    static async setup(opts = {}) {
        if (this.instance === undefined) {
            this.init();
        }
        this.width = opts.width || 1600;
        this.height = opts.height || 900;
        this.headless = opts.headless !== undefined ? opts.headless : true;
        this.slowMo = opts.slowMo || 80;
        this.scenarioName = opts.scenarioName || '';

        BrowserState.instance.browser = puppeteer.launch({
            headless: this.headless,
            slowMo: this.slowMo,
            args: [`--window-size=${this.width},${this.height}`]
        });

        BrowserState.instance.page = await (await BrowserState.instance.browser).newPage();
        if (opts.width !== undefined && opts.height !== undefined) {
            await BrowserState.instance.page.setViewport({width: this.width, height: this.height});
        }
    }

    static getInstance() {
        if (!BrowserState.instance) {
            this.init();
        }
        return BrowserState.instance;
    }

    static async getBrowser() {
        return await BrowserState.instance.browser;
    }

    static getPage() {
        return BrowserState.instance.page;
    }

}

module.exports = BrowserState;