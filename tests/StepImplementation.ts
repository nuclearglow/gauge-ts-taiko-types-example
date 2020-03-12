import * as assert from 'assert';
import { AfterSuite, BeforeSuite, Step } from "gauge-ts";
import { client, closeBrowser, focus, goto, openBrowser, press, TaikoBrowserOptions, write } from 'taiko';
import { getSearchForm, getSearchInputField, getSearchResultContainer, getSearchResults } from './../pages/google-search-selector';

export default class StepImplementation {

    @BeforeSuite()
    public async before() {
        // see env/default/default.properties for these settings
        const headlessMode = process.env.headless_mode.toLowerCase() === 'true';
        console.log(`Start Taiko (Headless mode: ${headlessMode})`);
        // see env/default/default.properties for these settings
        const debugMode = process.env.debug_mode.toLowerCase() === 'true';
        const debugModeDelay = parseInt(process.env.debug_mode_delay, 10) || 0;
        // chromium browser configuration with dev tools and no cors
        const browserConfiguration: TaikoBrowserOptions = {
            headless: headlessMode,
            observe: debugMode,
            observeTime: debugModeDelay,
            args: [
                '--disable-gpu', //
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--window-size=1600,900',
                '--disable-web-security',
                '--user-data-dir=.gauge/.user-data-dir',
                '--auto-open-devtools-for-tabs'
            ]
        };
        await openBrowser(browserConfiguration);
        // set up logging
        await client().Log.enable();
        await client().Log.entryAdded(console.log);
    }

    @Step('Goto Google Search')
    public async gotoGoogleSearch() {
        await goto('https://google.com');
    }

    @Step('Submit search query <query>')
    public async submitSearchQuery(query: string) {
        await getSearchForm().exists();
        const searchInputField = getSearchInputField();
        await focus(searchInputField);
        await write(query, searchInputField, { delay: 10 });
        await press('Enter');
    }

    @Step('Search results should exist')
    public async verifySearchResults() {
        await getSearchResultContainer().exists();
        assert.ok(await getSearchResults().exists());
    }

    @AfterSuite()
    public async afterSuite() {
        console.log("clean up needs to done after running the suite");
        await closeBrowser();
    }
}
