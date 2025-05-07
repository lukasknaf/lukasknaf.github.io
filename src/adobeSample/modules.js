import {getModule} from '../services/ccEverywhere.js';

(async () => {

    /* appImage:  the image container displayed in sample */
    var appImage = document.getElementById('image-container');

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

   const module = await getModule();

    document.getElementById("full-editor").addEventListener('click', () => {
        window.location.href = "/";
    });
    document.getElementById("QA").addEventListener('click', () => {
        window.location.href = "/src/pages/quickactions.html";
    });


    /* inputFile: file input picker */
    var inputFile = document.getElementById('fileInput');

    /* base64Asset: base64 representation we pass into QA function */
    var base64Asset;

    // Text to image prompt
    var inputField = document.getElementById('textfield-focused');

    /* This event listener checks to see if the user uploads a new file 
    and reads it into base64 data type for SDK ingestion later */
    inputFile.addEventListener('change', (e) => {
        const reader = new FileReader();
        // reads file into base 64 data type
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            base64Asset = reader.result;
        }
        reader.onerror = (error) => {
            console.log('error', error);
        };
    })

    const exportOptions = [
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
        {
            type: 'continue-editing',
            label: 'Continue Editing',
            style: {
                uiType: 'button'
            },
            options: [
                {
                    id: 'exportOption1',
                    style: {
                        uiType: 'dropdown'
                    },
                    action: {
                        target: 'express',
                        intent: 'add-icons-and-shapes'
                    }
                },
                {
                    id: 'exportOption2',
                    style: {
                        uiType: 'dropdown'
                    },
                    action: {
                        target: 'image-module',
                        intent: 'remove-background'
                    }
                },
                {
                    id: 'exportOption3',
                    style: {
                        uiType: 'dropdown'
                    },
                    action: {
                        target: 'express',
                        intent: 'add-images'
                    }
                },
                {
                    id: 'exportOption4',
                    style: {
                        uiType: 'dropdown'
                    },
                    action: {
                        target: 'express',
                        intent: 'add-text'
                    }
                }
            ]
        }
    ];


    const getAllowedFileTypes = () => {
        const allowedFileTypes = ['image/png', 'image/jpeg'];
        return { allowedFileTypes };
    }



    const textToImageModule = () => {
        let appConfig = {
            promptText: (document.getElementById('textfield-focused').value),
            callbacks: callbacks
        }
        // The export options defined for the Text to Image module don't appear until the user selects a generative image
        let exportConfig = exportOptions;
        module.createImageFromText(appConfig, exportConfig);
    }

    const imageEditingModule = () => {
        const docConfig = {
            asset: {
                data: base64Asset,
                type: 'image',
                dataType: 'base64'
            }
        }
        let appConfig = { callbacks: callbacks };
        let exportConfig = exportOptions;
        module.editImage(docConfig, appConfig, exportConfig);
    }

    // Button event listeners 

    document.getElementById('text-to-image').addEventListener('click', () => {
        textToImageModule();
    })

    document.getElementById('image-edit').addEventListener('click', () => {
        imageEditingModule();
    })

    document.getElementById('clear').addEventListener('click', () => {
        appImage.src = null;
        appImage.style.visibility = "hidden";
        inputField.value = '';

    })

    document.getElementById('reset').addEventListener('click', () => {
        base64Asset = null;
        appImage.src = null;
    })
})();