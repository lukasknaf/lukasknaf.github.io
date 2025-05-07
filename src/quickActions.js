import {getQuickActions, getModule} from './services/ccEverywhere.js';

const callbacks = {
    onCancel: () => { },
    onPublish: (intent, publishParams) => {
        const localData = { asset: publishParams.asset[0].data }
        console.log("Published asset", publishParams)
        if (publishParams.exportButtonId == "save-modified-asset") {
            appImage.src = localData.asset;
            appImage.style.visibility = "visible";
        }
    },
    onError: (err) => {
        console.error('Error received is', err.toString())
    }
}

const quickAction = await getQuickActions();
const module = await getModule();


/* base64Asset: base64 representation we pass into QA function */
var base64Asset;
/* appImage:  the image container displayed in sample */
var appImage = document.getElementById('image-container');
const docConfig = {}
const appConfig = { callbacks: callbacks }
const modalParams = {}

const exportOptions = [
    {
        id: 'edit-in-express',
        label: 'Edit in Adobe Express',
        action: {
            target: 'express',
        },
        style: {
            uiType: 'button'
        }
    },
    {
        id: 'download',
        label: 'Download',
        action: {
            target: 'download'
        },
        style: {
            uiType: 'button'
        }
    },
    {
        id: 'save-modified-asset',
        label: 'Save image',
        action: {
            target: 'publish'
        },
        style: {
            uiType: 'button'
        }
    },
];

function imageQuickAction(qa_id) {
    let exportConfig = exportOptions;
    console.log("quick action id", qa_id);
    switch (qa_id) {
        case 'convert-to-jpg':
            quickAction.convertToJPEG(docConfig, appConfig, exportConfig, modalParams);
            break;
        case 'convert-to-png':
            quickAction.convertToPNG(docConfig, appConfig, exportConfig, modalParams);
            break;
        case 'convert-to-svg':
            quickAction.convertToSVG(docConfig, appConfig, exportConfig, modalParams);
            break;
        case 'crop-image':
            quickAction.cropImage(docConfig, appConfig, exportConfig, modalParams);
            break;
        case 'resize-image':
            quickAction.resizeImage(docConfig, appConfig, exportConfig, modalParams);
            break;
        case 'remove-background':
            quickAction.removeBackground(docConfig, appConfig, exportConfig, modalParams);
            break;
        case 'generate-qr-code':
            quickAction.generateQRCode(docConfig, appConfig, exportConfig, modalParams);
            break;
        case 'generate-image':
            module.createImageFromText(appConfig, exportConfig);
            break;
        default: break;
    }
};

// Button event listeners 
const urlParams = new URLSearchParams(window.location.search);
const qa_id = urlParams.get('qa_id');
imageQuickAction(qa_id);
