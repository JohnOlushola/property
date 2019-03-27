'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertySchema extends Schema {
  up () {
    this.create('properties', (table) => {
      table.increments()
      table.timestamps()
      table.string('lat')
      table.string('long')
      table.string('propertyName')
      table.string('propertySize')
      table.string('propertyDescription')
      table.string('address')
      table.string('propertyType')
      table.string('purpose')
      table.string('city')
      table.string('state')
      table.string('price')
      table.string('duration')
      table.string('features')
      table.string('user_id')
    })
  }

  down () {
    this.drop('properties')
  }
}

module.exports = PropertySchema
