import {getQuickActions} from '../services/ccEverywhere.js';

(async () => {
    const initializeParams = {
        clientId: 'c8afc3542ba44b0f951f736e02c9b861',
        appName: 'V4 Sample',
    }

    const configParams = {
        loginMode: 'delayed'
    }

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

    /* appImage:  the image container displayed in sample */
    var appImage = document.getElementById('container');
    const docConfig = {}
    const appConfig = { callbacks: callbacks }
    const modalParams = {}

    document.getElementById("full-editor").addEventListener('click', () => {
        window.location.href = "/";
    });
    document.getElementById("mini-editor").addEventListener('click', () => {
        window.location.href = "/src/pages/modules.html";
    });
    document.getElementById("image-qa").addEventListener('click', () => {
        window.location.href = "/src/pages/quickactions.html";
    });

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


    function videoQuickAction(qa_id) {
        let exportConfig = exportOptions;

        switch (qa_id) {
            case 'convert-to-gif':
                quickAction.convertToGIF(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'convert-to-mp4':
                quickAction.convertToMP4(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'crop-video':
                quickAction.cropVideo(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'merge-videos':
                quickAction.mergeVideos(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'resize-video':
                quickAction.resizeVideo(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'trim-video':
                quickAction.trimVideo(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'animate-from-audio':
                quickAction.animateFromAudio(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'caption-video':
                quickAction.captionVideo(docConfig, appConfig, exportConfig, modalParams);
                break;
            default: break;
        }
    };

    // Button event listeners 

    let videoButtons = document.querySelectorAll('#video-buttons button');
    videoButtons.forEach((button) => {
        button.addEventListener('click', () => {
            videoQuickAction(button.id)
        })
    })

    document.getElementById('clear').addEventListener('click', () => {
        appImage.src = null;
        appImage.style.visibility = "hidden";
    })

    document.getElementById('reset').addEventListener('click', () => {
        appImage.src = null;
    })
})();