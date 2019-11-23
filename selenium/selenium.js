let moreButton;
const { Builder, By, until } = require('selenium-webdriver');

class Selenium {
    constructor() {
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
                } catch{
                }
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
}
module.exports = new Selenium();