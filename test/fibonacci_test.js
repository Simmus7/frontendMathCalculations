require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')


describe('fibonacci', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  /*afterEach(async function() {
    await driver.quit();
  })*/
  it('factorial', async function() {
    await driver.get("https://frontend-mathcalculations.herokuapp.com/?#/fibonacci")
    await driver.findElement(By.id("firstname1")).click()
    await driver.findElement(By.id("firstname1")).sendKeys("4")
    await driver.findElement(By.css(".p-button-label:nth-child(1)")).click()
    settimeout(1000)
    const result = await driver.findElement(By.id("result"))
    result === "0 1 1 2 "
    await driver.close()
  })
})