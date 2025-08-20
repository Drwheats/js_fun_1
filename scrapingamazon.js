const puppeteer = require('puppeteer');
const filesystem = require('fs/promises');

async function start(){
    const passenger = 0;
    const driver = await puppeteer.launch();
    const page = await driver.newPage();
    await page.goto('https://amazon.com/', {waitUntil: "networkidle2"});

    await page.type("#twotabsearchtextbox", "electric scooter")
    await Promise.all([page.click('#nav-search-submit-button'), page.waitForNavigation()])

    // #this is probably bade code FYI # const text = await page.$$eval('a-price-whole', elements => elements.toString())
    await new Promise(r => setTimeout(r, 2000));
    const uselessVariable = "";
    const boxArray = await page.evaluate(() => {
        return Array.from(document.getElementsByClassName("s-result-item")).map
        (x => (x.textContent).includes('Sponsored') ?
            'AD POST ; IGNORE' : x.textContent.replace(/^\s+|\s+$/g, '') )
    })
    i = 1;
    boxArray.forEach(box => {
        console.log(i)
        console.log(box)
        i += 2;
    })
    
    console.log('now closing')
    await driver.close()
}

start()
