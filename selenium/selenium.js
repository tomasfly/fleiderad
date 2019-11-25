let moreButton;
const { Builder, By, until } = require('selenium-webdriver');

class Selenium {
    constructor() {
    }
    getHeadlineUrlsInfobae(url) {
        (async function getComments() {
            const driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get(url);
                let headlines = await driver.wait(until.elementsLocated(By.css('.headline a')));
                for (let index = 0; index < headlines.length; index++) {
                    try {
                        await headlines[index].getAttribute('href').then(function (text) {

                            console.log(text);
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }
            } finally {
                await driver.quit();
            }
        })();
    }

    getCommentsInfobae(commentsUrl) {
        (async function getComments() {
            async function checkMore(element) {
                let result;
                try {
                    await driver.wait(until.elementLocated(By.css('.talk-load-more-button'))).then(function (elm) {
                        result = true;
                    }).catch(function (ex) {
                        result = false;
                    });
                } catch{ }
                return result;
            }
            const driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get(commentsUrl);
                while (await checkMore()) {
                    try {
                        moreButton = await driver.wait(until.elementLocated(By.css('.talk-load-more-button')), 3000);
                        if (await moreButton.isDisplayed()) {
                            await moreButton.click().then({
                            }).catch(function (ex) {
                            });
                        }
                    } catch{
                        break;
                    }
                }
                await driver.wait(until.elementLocated(By.xpath('//div[@data-slot-name="commentContent"]')));
                let comments;
                comments = await driver.findElements(By.xpath('//div[@data-slot-name="commentContent"]'));
                for (let index = 0; index < comments.length; index++) {
                    try {
                        await comments[index].getText().then(function (text) {
                            console.log(text);
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }
            } finally {
                await driver.quit();
            }
        })();
    }

    getHeadlineUrlsInfobaeBeta(url) {
        (async function getComments() {
            const driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get(url);
                let headlines = await driver.wait(until.elementsLocated(By.css('.headline a')));
                let urls = [];
                for (let index = 0; index < 2; index++) {
                    try {
                        await headlines[index].getAttribute('href').then(function (text) {
                            urls[index] = text;
                            //urlsArray[index] = text; 
                            //driver.get(text);
                            //console.log(text);
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }

                for (let index = 0; index < urls.length; index++) {
                    await driver.get(urls[index]);
                }
            } finally {
                await driver.quit();
            }
        })();
    }
}
module.exports = new Selenium();