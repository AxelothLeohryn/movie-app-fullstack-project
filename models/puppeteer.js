const puppeteer = require('puppeteer');

const getRatings = async (title) => {
    const browser = await puppeteer.launch({headless: "new"});
    try {
        const page = await browser.newPage();
        await page.goto('https://www.filmaffinity.com/es/main.html', {
            waitUntil: ['domcontentloaded'],
        });

        if (await page.$('#qc-cmp2-ui > div.qc-cmp2-footer > div.qc-cmp2-buttons-desktop > button') !== null) {
            const button = await page.$('#qc-cmp2-ui > div.qc-cmp2-footer > div.qc-cmp2-buttons-desktop > button');
            await button.click();
        } 
        
        await page.waitForSelector('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-v43ltw');
        const button2 = await page.$('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-v43ltw');
        await button2.click();
        
        await page.waitForSelector('input#top-search-input-2');
        const search = await page.$('input#top-search-input-2');
        await search.type(title)

        await page.keyboard.press('Enter');
        await page.waitForNavigation();


        await page.waitForSelector('#title-result > div > div:nth-child(2) > div.fa-shadow-nb.item-search > div > div.mc-poster > a');
        const firstResultSelector = await page.$('#title-result > div > div:nth-child(2) > div.fa-shadow-nb.item-search > div > div.mc-poster > a');
        await firstResultSelector.click();
        await page.waitForNavigation();

        let criticasResultado = [];
        const criticas = [2, 3]; 
        for (let i = 0; i < criticas.length; i++) {
            let criticasObject = {};
            let divReviewBody = await page.$(`#pro-reviews > li:nth-child(${criticas[i]}) > div > div:nth-child(1)`);
            let aAuthor = await page.$(`#pro-reviews > li:nth-child(${criticas[i]}) > div > div.pro-crit-med > a:nth-child(1)`);
            let aCompany = await page.$(`#pro-reviews > li:nth-child(${criticas[i]}) > div > div.pro-crit-med > a:nth-child(2)`);
            criticasObject.critica = await page.evaluate(div => div.innerText, divReviewBody);
            criticasObject.author = await page.evaluate(a => a.innerText, aAuthor);
            criticasObject.company = await page.evaluate(a => a.innerText, aCompany);
            criticasResultado.push(criticasObject);
        }

        console.log(criticasResultado);
        await browser.close()
        return criticasResultado
    } catch (err) {
        console.log(err);
        return {message: err};
    } 
}


const puppeteerCritics = {
    getRatings
}

module.exports = puppeteerCritics;