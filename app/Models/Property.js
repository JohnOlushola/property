'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Property extends Model {
    owner () {
        return this.belongsTo('App/Models/User', 'user_id')
    }
}

module.exports = Property
