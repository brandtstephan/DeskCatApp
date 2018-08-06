const electron = require('electron');
const { app, BrowserWindow } = electron
const _ = require('lodash')

app.on('ready', () => {

  let displays = electron.screen.getAllDisplays()
  //console.log(displays)

  displays = _.map(displays, display => {

    let Mywindow = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      height: display.bounds.height,
      width: display.bounds.width,
      icon: __dirname + '/icon/icon.ico',
      transparent: true,
      frame: false,
      fullscreen: true,
      alwaysOnTop: true
    });

    let content = Mywindow.webContents

    Mywindow.setIgnoreMouseEvents(true)

    Mywindow.loadURL('file://' + __dirname + '/index.html');
    
    return {
      bounds: display.bounds,
      window: Mywindow,
      content: content
    }

  })

  //keep sending the mouse position to the window, because the window itself ignroes all mousemoves

  let sendMouse = () => {
    let mouse = electron.screen.getCursorScreenPoint()

    if( app == null) return;
    _.each(displays, display => {

      let bounds = display.bounds
      let cont = display.content

      if (display.content) {
        cont.send('mousePosition', { x: mouse.x - bounds.x, y: mouse.y - bounds.y , boundries: bounds})
      }
    })
    //console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);

    setTimeout(sendMouse, 10);
  }
  sendMouse();
  
});

app.on('closed', function () {

  app = null;


});

app.on('close ', function () {

  app = null;

});

