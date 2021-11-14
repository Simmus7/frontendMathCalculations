require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')


describe('factorial', function() {
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
    await driver.get("https://frontend-mathcalculations.herokuapp.com/?#/factorial")
    await driver.findElement(By.id("firstname1")).click()
    await driver.findElement(By.id("firstname1")).sendKeys("4")
    await driver.findElement(By.css(".p-button-label:nth-child(1)")).click()
    settimeout(1000)
    const result = await driver.findElement(By.id("result"))
    result === 12
    await driver.close()
  })
})






function settimeout (tiempo) {
    let a = 0
    while (a < (tiempo* 1000000)) a++
  }