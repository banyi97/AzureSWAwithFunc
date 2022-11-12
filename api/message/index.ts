import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const responseMessage = "test data"
    context.res = {
        status: 200,
        body: {data: responseMessage},
        headers: {
            'Content-Type': 'application/json'
        }
    };

};

export default httpTrigger;