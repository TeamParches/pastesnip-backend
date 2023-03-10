const authController = require('../../controllers/auth.controller')

module.exports = async (context) => {
    try {
        console.info('Authenticating a request', {
            origin: context.req.headers.origin,
            referer: context.req.headers.referer,
            query: context.params.query,
        })
        return await authController.verify(context.req.headers.auth)
    } catch (error) {
        return null
    }
}
