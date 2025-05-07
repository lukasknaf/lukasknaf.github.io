import 'https://cc-embed.adobe.com/sdk/v4/CCEverywhere.js';

const initializeParams = {
    clientId: 'c8afc3542ba44b0f951f736e02c9b861',
    appName: 'V4 Sample',
}

const configParams = {
    loginMode: 'delayed'
}

let expressSdk = null;

 async function initializeExpressSDK() {
    if (expressSdk==null) {
        expressSdk = await window.CCEverywhere.initialize(initializeParams, configParams);
    }
}

export async function getEditor() {
    await initializeExpressSDK();
    return expressSdk.editor;
}

export async function getModule() {
    await initializeExpressSDK();
    return expressSdk.module;
}

export async function getQuickActions() {
    await initializeExpressSDK();
    return expressSdk.quickAction;
}

export default { getEditor, getModule, getQuickActions };