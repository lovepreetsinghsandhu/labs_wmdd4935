var hapi = require('hapi')
var joi = require('joi')

var server = new hapi.Server()

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
})

server.route({
    method: 'POST',
    path: '/login',
    config: {
        handler: myhandle,
        validate: {
            payload: joi.object({
                isGuest: joi.boolean().required(),
                username: joi.string().when('isGuest', { is: false, then: joi.required() }),
                password: joi.string().alphanum(),
                accessToken: joi.string().alphanum()
            }).options({ allowUnknown: true }).without('password', 'accessToken')
        }
    }
})

function myhandle(request, reply){
    reply('login successful')
}

server.start((err) => {

    if (err) {
        console.log(err)
    }
    console.log('Server running at: ${server.info.uri}')
})