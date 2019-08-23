const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const BrowserState = require('BrowserState');
const InputPage = require('pages/primereact/InputPage');
const DropdownPage = require('pages/primereact/DropdownPage');

// const width = 1600;
// const height = 900;
const width = 1200;
const height = 300;

const DEFAULT_TIMEOUT = 25000;

beforeAll(async () => {
    await BrowserState.setup({headless: false, width: width, height: height});
});
afterAll(async () => {
    await (await BrowserState.getBrowser()).close();
});

describe("PrimeReact demo - interact with InputText fields", () => {
    // test("I can find 'Basic' input field, focus and type in some text", async () => {
    //     let inputPage = new InputPage();
    //     await inputPage.open("https://www.primefaces.org/primereact/#/inputtext");
    //     await inputPage.pageVerification();
    //     await (await inputPage.basicInputText()).setText("lorem ipsum");
    //     console.log("waiting");
    // }, DEFAULT_TIMEOUT);
    test("I can find dropdown, focus and perform actions", async () => {
        let dropdownPage = new DropdownPage();
        await dropdownPage.open();
        await dropdownPage.pageVerification();

        // Basic
/*
        await (await dropdownPage.basicDropdown()).clickTrigger();
        let items = await (await dropdownPage.basicDropdown()).getItems();
        console.log(items);
        expect(items).to.include.members(['Rome', 'New York', 'Paris']);
        //await (await dropdownPage.basicDropdown()).clickTrigger();
        await (await dropdownPage.basicDropdown()).selectItem(items[1]);
        let selectedItem = await (await dropdownPage.basicDropdown()).getSelection();
        console.log(`Selection is "${selectedItem}"`);
        expect(selectedItem).to.equal('Rome');
        console.log(await BrowserState.getPage().viewport());
*/

        // Editable
        let isEditable = await (await dropdownPage.editableDropdown()).isEditable();
        expect(isEditable).to.be.true;
        await (await dropdownPage.editableDropdown()).selectItem('Honda');
        let selectedItem = await( await dropdownPage.editableDropdown()).getSelection();
        expect(selectedItem).to.equal('Honda');
        await (await dropdownPage.editableDropdown()).setText('Skoda');
        selectedItem = await( await dropdownPage.editableDropdown()).getSelection();
        expect(selectedItem).to.equal('Skoda');


        // await (await dropdownPage.basicInputText()).setText("lorem ipsum");
        console.log("waiting");
    }, DEFAULT_TIMEOUT);
});

