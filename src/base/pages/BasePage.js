// const PageObject = require('puppeteer-page-object');
const BrowserState = require('BrowserState');

class BasePage {
    constructor(options = {}) {
        this.screenshotsPath = options.screenshotsPath || 'screenshots';
        this.headless = options.headless !== undefined ? options.headless : true;
        this.scenarioName = options.scenarioName || '';
        this.args = options.args || ['--no-sandbox', '--disable-setuid-sandbox'];

        this.browser = BrowserState.getInstance().browser;
        this.page = BrowserState.getInstance().page;
    }

    /**
     * Generates screenshot name with this.scenarioName and current date
     * @example
     * returns 'Fri_Dec_08_2017_14:56:01_GMT+0300_(MSK)'
     * @example
     * returns 'scenario-name_Fri_Dec_08_2017_14:56:01_GMT+0300_(MSK)'
     * @returns {string} screenshot file name
     */
    generateScreenshotName() {
        const date = new Date();
        const fileNameDate = date.toString().replace(/ /gm, '_');

        if (this.scenarioName) {
            return `${this.scenarioName}_${fileNameDate}.jpg`;
        }

        return `${fileNameDate}.jpg`;
    }

    /**
     * Takes screenshot and save it to this.screenshotsPath
     * By default to __dirname/screenshots
     * @param {object} params screenshot parameters
     * @returns {Promise<void>}
     */
    async screenshot(params) {
        return await this.page.screenshot(
            Object.assign(
                {
                    path: path.join(this.screenshotsPath, this.generateScreenshotName()),
                },
                params,
            ),
        );
    }

    /**
     * Opens url with page instance
     * @param {string} url
     * @returns {Promise<void>}
     */
    async open(url) {
        return await BrowserState.getPage().goto(url)
    }

    async init() {
        // TODO: move initialization code from beforeAll here, override PageObject implementation
        // TODO: same for close()
        throw new Error("init method should not be used")
    }

    async pageVerification() {
        throw new Error("pageVerification method is not implemented for this page class")
    }
}

module.exports = BasePage;