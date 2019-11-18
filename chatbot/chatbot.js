'use strict'
const dialogflow = require('dialogflow');
const structjsnon = require('./structjson')
const config = require('../config/keys');
const projectID = config.googleProjectID;
const credentials = {
    client_email: config.googleClientEmail, 
    private_key: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectID: projectID, credentials: credentials});
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
module.exports = {
    textQuery: async function(text,parameters = {}){
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput : {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payLoad: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient
        responses = await self.handleAction(responses);
        return responses;
    },
    eventQuery: async function(event,parameters = {}){
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput : {
                event: {
                    name: event,
                    parameters: structjsnon.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };
        let responses = await sessionClient
        responses = await self.handleAction(responses);
        return responses;
    },
    handleAction: function(responses){
        return responses;
    }
}