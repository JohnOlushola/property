'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, index, data) => {
  // const defaultValue = {
  //   fullname: faker.username(),
  //   email: faker.email(),
  //   phone: faker.phone(),
  //   password: 'secret',
  // }

  const defaultValue = {
    fullname: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0800002332",
    password: 'secret',
    user_cat: 'user',
  }

  return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Post', (faker) => {
  return {
    title: faker.sentence(),
    body: faker.paragraph(),
    user_id: async () => {
      return (await Factory.model('App/Models/User').create()).id
    }
  }
})
