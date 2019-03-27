'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Authentication')

trait('Test/Browser')
trait('DatabaseTransactions')

test('should display an error when crendentials are incorect', async ({ browser }) => {
  // Given we have no user

  // And we are on the login page
  const page = await browser.visit('/login')

  // When we fill and send the login form
  await page
    .type('[name="email"]', 'johndoe@gmail.com')
    .type('[name="password"]', 'secret')
    .submitForm('form')
    .waitForNavigation()

  // We expect to be again on the login page
  await page.assertPath('/login')

  // And we expect to see an alert message
  await page.assertExists('div[role="alert"]')

  // And to see the email filled
  await page.assertValue('[name="email"]', 'johndoe@gmail.com')
}).timeout(0)

test('a user can log in inside the application', async ({ browser }) => {
  // Given we have a user
  const user = await Factory.model('App/Models/User').create({ password: 'secret' })

  // And we are on the login page
  const page = await browser.visit('/login')

  // When we fill and send the login form
  await page
    .type('[name="email"]', user.email)
    .type('[name="password"]', 'secret')
    .submitForm('form')
    .waitForNavigation()

  // We expect to be on the homepage
  await page.assertPath('/')
}).timeout(0)
