'use strict'

const Property = use('App/Models/Property')
const Database = use('Database')
const { validateAll } = use('Validator')

class PropertyController {
    async index({ params, view }) {
        /**
         * Fetch all property inside our database.
         */
        const property = await Property.findOrFail(params.id)

        /**
         * Render the view 'property.index'
         * with the property fetched as data.
         */
        return view.render('property.index', { property: property.toJSON() })
    }

    create({ view }) {
        /**
         * Render the view 'property.create'.
         */
        return view.render('property.create')
    }

    async store({ auth, session, request, response }) {
        /**
         * Getting needed parameters.
         */
        const data = request.all();

        const user = await auth.getUser();

        data.user_id = user.email;

        /**
         * Validating our data.
         */
        const validation = await validateAll(data, {
            propertyName: 'required',
            address: 'required',
            propertyType: 'required',
            purpose: 'required',
            price: 'required'
        })

        /**
         * If validation fails, early returns with validation message.
         */
        if (validation.fails()) {
            session
                .withErrors(validation.messages())
                .flashAll()

            return response.redirect('back')
        }

        /**
         * Creating a new property into the database.
         */
        await Property.create(data)

        return response.redirect('/user/properties');
    }

    async search({ request, view }) {
        console.log(request.all());
        const { query, type, maxPrice} = request.all();

        // search
        const results = 
        await Database
        // .raw('select * from properties where propertyName = ? ')
        .from('properties')
        .whereRaw('propertyName = ? AND propertyType LIKE ? OR price <= ?', [query, type, maxPrice])

        // const result =
        // await Database
        // .raw('select * from properties where propertyName LIKE ?', [query])

        console.log(results);
        // return results
        return view.render('property.result', {results: results, query: query})
    }

    async category({ params, view }) {

        const properties = 
        await Database
        .from('properties')
        .where('propertyType', params.cat);

        /**
         * Render the view 'property.category'.
         */
        return view.render('property.category', {properties: properties, category: params.cat})
    }

    async properties({ view }){
        const properties = 
        await Database.from('properties')

        return view.render('property.all', {properties: properties})        
    }
 
    async edit({ params, view }) {
        /**
         * Finding the property.
         */
        const property = await Property.findOrFail(params.id)

        return view.render('property.edit', { property: property.toJSON() })
    }

    async update({ params, session, request, response }) {
        /**
         * Getting needed parameters.
         */
        const data = request.only(['title', 'body'])

        /**
         * Validating our data.
         */
        const validation = await validateAll(data, {
            title: 'required',
            body: 'required',
        })

        /**
         * If validation fails, early returns with validation message.
         */
        if (validation.fails()) {
            session
                .withErrors(validation.messages())
                .flashAll()

            return response.redirect('back')
        }

        /**
         * Finding the property and updating fields on it
         * before saving it to the database.
         */
        const property = await Property.findOrFail(params.id)
        property.merge(data)
        await property.save()

        return response.redirect('/')
    }

    async delete({ params, response }) {
        /**
         * Finding the property and deleting it
         */
        const property = await Property.findOrFail(params.id)
        await property.delete()

        return response.redirect('/')
    }
}

module.exports = PropertyController
