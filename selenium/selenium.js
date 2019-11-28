let moreButton;
ARTICLES_TO_GET_URL_FROM_HOME = 2;
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class Selenium {
    constructor() {
    }
    getHeadlineUrlsInfobae(url) {
        (async function getHeadlines() {
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

    getCoralTalkUrls(infoBaeHomeUrl) {
        (async function getUrls() {
            const driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get(infoBaeHomeUrl);
                let headlines = await driver.wait(until.elementsLocated(By.css('.headline a')));
                let urls = [];
                for (let index = 0; index < ARTICLES_TO_GET_URL_FROM_HOME; index++) {
                    try {
                        await headlines[index].getAttribute('href').then(function (text) {
                            urls[index] = text;
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }

                for (let index = 0; index < urls.length; index++) {
                    await driver.get(urls[index]);
                    let closeToCoralTalkElement = await driver.wait(until.elementLocated(By.css('div #recommendations-marker')));
                    await driver.executeScript("arguments[0].scrollIntoView()", closeToCoralTalkElement);
                    let coralTalkIframe = await driver.wait(until.elementLocated(By.css('#coral_talk_stream_iframe')));
                    await coralTalkIframe.getAttribute('src').then(function (text) {
                        console.log(text);
                    });
                }
            } finally {
                await driver.quit();
            }
        })();
    }

    async captureCorlTalkJsonBody(corelTalkUrl){
        // let proxyAddress = '212.56.139.253:80';
        // let option = new chrome.Options().addArguments(`--proxy-server=http://${proxyAddress}`);
        // const driver = await new Builder().forBrowser('chrome').setChromeOptions(option).build();
        // await driver.get(corelTalkUrl);
        // driver.close();
    }
}
module.exports = new Selenium();