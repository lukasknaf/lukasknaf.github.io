import {getModule, getQuickActions} from '../services/ccEverywhere.js';
var base64Asset;
(async () => {
    const initializeParams = {
        clientId: 'c8afc3542ba44b0f951f736e02c9b861',
        appName: 'V4 Sample',
    }

    const configParams = {
        loginMode: 'delayed'
    }


    function showCopiedMessage() {
        // Create the div element
        const copiedDiv = document.createElement('div');
        copiedDiv.className = 'copied-div';
        copiedDiv.innerText = 'Copied ✅';

        // Add the div to the body
        document.body.appendChild(copiedDiv);

        // Set a timeout to remove the div after 2 seconds
        setTimeout(() => {
            copiedDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(copiedDiv);
            }, 500); // Wait for the fade-out transition to finish
        }, 1500); // Start fade-out after 1.5 seconds
    }

    const callbacks = {
        onCancel: () => { window.close() },
        onPublish: (intent, publishParams) => {
            const localData = { asset: publishParams.asset[0].data }
            console.log("Published asset", publishParams)
            if (publishParams.exportButtonId == "save-modified-asset") {
                appImage.src = localData.asset;
                appImage.style.visibility = "visible";
            }
            else if (publishParams.exportButtonId == "copy-to-clipboard") {
                console.log('copy image button callback') 
                var dataURL_from_quick_action = localData.asset;

                window.electronAPI.copyImage(dataURL_from_quick_action);
                showCopiedMessage();
            }
            else if (publishParams.exportButtonId == "retake-screenshot") {
                window.electronAPI.clearClipboard();
                window.electronAPI.loadElectronScreenshotTool();
            }
        },
        onError: (err) => {
            console.error('Error received is', err.toString())
	    window.close();
        }
    }

    const quickAction = await getQuickActions();
    const module = await getModule();
    /* inputFile: file input picker */
    // var inputFile = document.getElementById('fileInput');

    /* base64Asset: base64 representation we pass into QA function */
    
    try {
    	base64Asset = await window.electronAPI.retrieveImage()
	    console.log('Image: ', base64Asset)
    } catch (error) {
	console.log('No image supplied')
    console.log(error)
	docConfig = null
	base64Asset = null
    }
    /* appImage:  the image container displayed in sample */
    // var appImage = document.getElementById('image-container');
    var docConfig = {  
    asset: {
        data: base64Asset,
        dataType: "base64",
        type: "image",
        },
    }
    const appConfig = { callbacks: callbacks }
    const modalParams = {}

    const exportOptions = [
        {
            id: 'copy-to-clipboard',
            label: 'Copy',
            action: {
                target: 'publish'
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
            id: 'retake-screenshot',
            label: 'Retake',
            action: {
                target: 'publish'
            },
            style: {
                uiType: 'button'
            }
        },
    ];

    const textToImageModule = (userPromptText) => {
        let appConfig = {
            promptText: "",
            callbacks: callbacks
        }
        // The export options defined for the Text to Image module don't appear until the user selects a generative image
        let exportConfig = exportOptions;
        module.createImageFromText(appConfig, exportConfig);
    }

    function convert_to_jpeg(dataURL) {
        const img = new Image()
        
        img.src = dataURL

        // Create a canvas element
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
    
        // Set canvas dimensions to match the image dimensions
        canvas.width = img.width;
        canvas.height = img.height;
    
        // Draw the image onto the canvas
        context.drawImage(img, 0, 0);
    
        // Export the image as JPEG data URL
        const jpegDataURL = canvas.toDataURL('image/jpeg');
        console.log('converted jpeg:', jpegDataURL)
        return jpegDataURL
    }

    function imageQuickAction(qa_id) {
        let exportConfig = exportOptions;
        switch (qa_id) {
            case 'convert-to-png':
                if (docConfig.asset.length > 20) {
                    exportConfig = exportOptions
                            docConfig.asset.data = convert_to_jpeg(docConfig.asset.data)
                            quickAction.convertToPNG(docConfig, appConfig, exportConfig, modalParams);
                } else {
                    docConfig = {};
                            exportConfig = exportOptions
                            quickAction.convertToPNG(docConfig, appConfig, exportConfig, modalParams);
                }
                        break;
                        
            case 'convert-to-jpg':
		if (docConfig.asset.data.length > 20) {
                	quickAction.convertToJPEG(docConfig, appConfig, exportConfig, modalParams);
		} else {
			docConfig = {};
                	quickAction.convertToJPEG(docConfig, appConfig, exportConfig, modalParams);
		}
                break;

            case 'convert-to-svg':
		if (docConfig.asset.length > 20) {
                    exportConfig = exportOptions
                	quickAction.convertToSVG(docConfig, appConfig, exportConfig, modalParams);
		} else {
			    docConfig = {};
                exportConfig = exportOptions
                	quickAction.convertToSVG(docConfig, appConfig, exportConfig, modalParams);
		}
                break;
            case 'crop-image':
		docConfig = {}
                quickAction.cropImage(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'resize-image':
		docConfig = {}
                quickAction.resizeImage(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'remove-background':
                quickAction.removeBackground(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'generate-qr-code':
                docConfig = {};
                quickAction.generateQRCode(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'convert-to-gif':
                docConfig = {};
                quickAction.convertToGIF(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'convert-to-mp4':
                docConfig = {};
                quickAction.convertToMP4(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'crop-video':
                docConfig = {};
                quickAction.cropVideo(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'merge-videos':
                docConfig = {};
                quickAction.mergeVideos(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'resize-video':
                docConfig = {};
                quickAction.resizeVideo(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'trim-video':
                docConfig = {};
                quickAction.trimVideo(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'animate-from-audio':
                docConfig = {};
                quickAction.animateFromAudio(docConfig, appConfig, exportConfig, modalParams);
                break;
            case 'caption-video':
                docConfig = {};
                quickAction.captionVideo(docConfig, appConfig, exportConfig, modalParams);
                break;
	        case 'text-to-image':
		        textToImageModule('')	
            default: break;
        }
    };

    // Use the 'location.search' property to get the URL query string
  const queryString = window.location.search;

  // Parse the query parameters from the URL
  const urlParams = new URLSearchParams(queryString);

  // Access specific query parameters
  const key = urlParams.get('qa'); 
  const imagePrompt = urlParams.get('imagePrompt'); 

  console.log('Key:', key);
  console.log('Image prompt in vite:', imagePrompt);


    imageQuickAction(key);
})();
