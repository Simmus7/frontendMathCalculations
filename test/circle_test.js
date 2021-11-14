require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')


describe('circle', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('circle', async function() {
    await driver.get("https://frontend-mathcalculations.herokuapp.com/?#/circle")
    await driver.findElement(By.id("firstname1")).click()
    await driver.findElement(By.id("firstname1")).sendKeys("4")
    await driver.findElement(By.css(".p-button-label:nth-child(1)")).click()
    settimeout(1000)
    const result1 = await driver.findElement(By.id("result1"))
    const result2 = await driver.findElement(By.id("result2"))
    result1 === 4*Math.PI*2
    result2 === 4*4*Math.PI
    await driver.close()
  })
})


function settimeout (tiempo) {
    let a = 0
    while (a < (tiempo* 1000000)) a++
  }