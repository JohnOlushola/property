'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const { validateAll } = use('Validator')

class UserController {
  create ({ view }) {
    /**
     * Render the view 'user.create'.
     *
     * ref: http://adonisjs.com/docs/4.1/views
     */
    return view.render('user.create')
  }

  async store ({ auth, session, request, response }) {
    /**
     * Getting needed parameters.
     *
     */
    const data = request.only(['fullname', 'email', 'password', 'password_confirmation', 'phone', 'userCat', 'bvn'])

    /**
     * Validating our data.
     *
     * ref: http://adonisjs.com/docs/4.1/validator
     */
    const validation = await validateAll(data, {
      fullname: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password',
    })

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    // Deleting the confirmation field since we don't
    // want to save it
    delete data.password_confirmation

    /**
     * Creating a new user into the database.
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_create
     */
    const user = await User.create(data)

    // Authenticate the user
    await auth.login(user)

    return response.redirect('/')
  }

  profile ({ view }) {
    /**
     * Render the view 'user.create'.
     *
     * ref: http://adonisjs.com/docs/4.1/views
     */
    return view.render('user.profile')
  }

  async properties({ view, auth }){
    let user = auth.user;
    const properties = 
    await Database
      .table('properties')
      .where('user_id', user.email)

    return view.render('user.properties', { properties: properties })
  }

  async agents({ view }){
    const agents = 
    await Database
    .table('users')
    .where('userCat', 'agent');

    return view.render('user.agent.agents', { agents: agents });
  }

  async agentProfile({ params, view }){
    // return number of properties handled
    /**
     * Fetch all property inside our database.
     */
    const agent = await User.findOrFail(params.id)
        
    return view.render('user.agent.profile', { agent: agent });
  }
}

module.exports = UserController
