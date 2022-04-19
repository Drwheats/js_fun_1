const puppeteer = require('puppeteer');
const filesystem = require('fs/promises');

async function start(){
    const driver = await puppeteer.launch({headless: false});
    const page = await driver.newPage();
    await page.goto('https://amazon.com/');

    await page.type("#twotabsearchtextbox", "white mechanical keyboard")
    await Promise.all([page.click('#nav-search-submit-button'), page.waitForNavigation()])



    const nameArray = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
    })

    await filesystem.writeFile("productNames.txt", nameArray.join("\r\n"));
    //
    //
    //
    //
    // const secretMessage = await page.$eval('#message', element => element.textContent)
    // console.log(secretMessage)
    //
    // await page.waitForNavigation()
    //
    //





    const photographs = await page.$$eval("img", (pictures) => {
        return pictures.map(x => x.src)
    })

    for (const photograph of photographs) {
        const picturePage = await page.goto(photograph);
        await filesystem.writeFile(photograph.split("/").pop(), await picturePage.buffer())
    }



    await driver.close()
}

start()