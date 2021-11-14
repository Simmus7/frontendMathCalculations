require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')


describe('rectangle', function() {
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
  it('rectangle', async function() {
    await driver.get("https://frontend-mathcalculations.herokuapp.com/?#/rectangle")

    await driver.findElement(By.id("side1")).click()
    await driver.findElement(By.id("side1")).sendKeys("4")

    await driver.findElement(By.id("side2")).click()
    await driver.findElement(By.id("side2")).sendKeys("3")

    
    await driver.findElement(By.css(".p-button-label:nth-child(1)")).click()
    settimeout(1000)
    const result1 = await driver.findElement(By.id("result1"))
    const result2 = await driver.findElement(By.id("result2"))
    result1 === 14
    result2 === 12
    await driver.close()
  })
})


function settimeout (tiempo) {
    let a = 0
    while (a < (tiempo* 1000000)) a++
  }