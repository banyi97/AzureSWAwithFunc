import { AzureFunction, Context, HttpRequest } from "@azure/functions"

var jose = require('jose');
const JWKS = jose.createRemoteJWKSet(new URL('https://banyi97.eu.auth0.com/.well-known/jwks.json'))

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const headerValue = req.headers.Authentication || req.headers.authentication || ''
    const jwt = headerValue.replace(/^Bearer\s/, '').replace(/^bearer\s/, '')
    
    try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, JWKS, {
            issuer: 'https://banyi97.eu.auth0.com/',
            audience: ['AzureSWAwithFunc', 'https://banyi97.eu.auth0.com/userinfo']
        })
        context.res = {
            status: 200,
            body: { data: 'ok' },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.res = {
            status: 401,
            body: {error: error, authHeader: headerValue, fullHeader: req.headers}
        };
    }
};

export default httpTrigger;