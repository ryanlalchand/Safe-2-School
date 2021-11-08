//scan a student, receive dialog box when system caches URL
//if connection to DB slow, kickback a push notification that it failed once validated
//obviously this is not ideal bc the driver might not know who it was that failed but at least its better than not knowing at all

//using qrcodescan.in as inspiration
//use html geolocation upon scan event

//web cam video stream should get rendered here
var videoElem = "<html><video></video></html>";

import('qr-scanner/qr-scanner.min').then((module) => {
    const QrScanner = module.default;
    //imports QRScanner
    //import QrScanner from '../../node_modules/qr-scanner';
    //Sets worker path
    QrScanner.WORKER_PATH = '../../node_modules/qr-scanner/qr-scanner-worker.min.js';

    //var videoElem;
    //Creates QRScanner instance
    const qrScanner = new QrScanner(videoElem, result => console.log('decoded qr code:', result, QrScanner._onDecodeError));

   

    //possibly look into Single image scanning instead of video
    //if camera, scan
    qrScanner.hasCamera();
    qrScanner.setCamera(facingModeOrDeviceId);
    qrScanner.start();

    //if device has flash, and the flash isn't on, turn it on
    if(qrScanner.hasFlash()){
        if(!qrScanner.isFlashOn()){
            qrScanner.turnFlashOn();
        }
    } 

    //once scanned, display dialog box, stop scanning with qrScanner.stop();
    //qrScanner.turnFlashOff(); 


});
