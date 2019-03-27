'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.timestamps()
      table.string('fullname', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('phone', 60).notNullable()
      table.string('userCat', 60).notNullable()
      table.string('bvn', 60).notNullable()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
