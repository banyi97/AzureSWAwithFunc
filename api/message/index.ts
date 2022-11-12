import { AzureFunction, Context, HttpRequest } from "@azure/functions"

var jose = require('jose');
const JWKS = jose.createRemoteJWKSet(new URL(process.env.JWKS_URL))

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const headerValue = req.headers.Authentication || req.headers.authentication || ''
    const jwt = headerValue.replace(/^Bearer\s/, '').replace(/^bearer\s/, '')
    
    try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, JWKS, {
            issuer: process.env.ISSUER,
            audience: process.env.AUDIENCE.split(',')
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
        };
    }
};

export default httpTrigger;