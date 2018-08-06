const electron = require('electron');
const { app, BrowserWindow } = electron
const _ = require('lodash')

let closed = false;

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

    Mywindow.on('close', event =>{
      _.each(displays, display=>display.closed = true)
      app.quit()
    })

    let primary = false
    if(electron.screen.getPrimaryDisplay().id === display.id){
      primary = true
      content.send('isPrimaryScreen', true)
    }

    return {
      bounds: display.bounds,
      window: Mywindow,
      content: content,
      primary: primary,
      closed: false
    }
  })

  //keep sending the mouse position to the window, because the window itself ignroes all mousemoves

  let sendMouse = () => {

    try{

      let mouse = electron.screen.getCursorScreenPoint()

      _.each(displays, display => {

        if(display.closed) return

        let bounds = display.bounds
        let cont = display.content
        
        cont.send('mousePosition', { x: mouse.x - bounds.x, y: mouse.y - bounds.y , boundries: bounds})

      })
      //console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);

      setTimeout(sendMouse, 10);

    }catch(e){
      console.log(e)
      close()
    }
  }
  sendMouse();

  let close = ()=>{
    console.log(displays)
  }
  
});

