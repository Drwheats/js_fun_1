const puppeteer = require('puppeteer');
const filesystem = require('fs/promises');

async function start(){
    const driver = await puppeteer.launch();
    const page = await driver.newPage();
    await page.goto('https://amazon.com/', {waitUntil: "networkidle2"});

    await page.type("#twotabsearchtextbox", "electric scooter")
    await Promise.all([page.click('#nav-search-submit-button'), page.waitForNavigation()])

    // #this is probably bade code FYI # const text = await page.$$eval('a-price-whole', elements => elements.toString())
    await new Promise(r => setTimeout(r, 2000));
    const boxArray = await page.evaluate(() => {
        return Array.from(document.getElementsByClassName("s-result-item")).map(x => (x.textContent).includes('Sponsored') ? 'AD POST ; IGNORE' : x.textContent.replace(/[\n\r]/g, '').trim())
    })
    i = 0;
    boxArray.forEach(box => {
        console.log(i)
        console.log(box)
        i += 1;
    })
    // await filesystem.writeFile("productNames.txt", nameArray.join("\r\n"));

    // const secretMessage = await page.$eval('#message', element => element.textContent)
    // console.log(secretMessage)
    //
    // await page.waitForNavigation()
    //
    //
    //
    //
    //
    //
    //
    // const photographs = await page.$$eval("img", (pictures) => {
    //     return pictures.map(x => x.src)
    // })
    //
    // for (const photograph of photographs) {
    //     const picturePage = await page.goto(photograph);
    //     await filesystem.writeFile(photograph.split("/").pop(), await picturePage.buffer())
    // }
    //
    //
    console.log('now closing')
    await driver.close()
}

start()