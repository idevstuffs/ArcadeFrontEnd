var gui = require('nw.gui');

var closeShortcut = new gui.Shortcut(
{
    'key' : 'Delete'
});

gui.App.registerGlobalHotKey(closeShortcut);

closeShortcut.on('active', function()
{
    gui.App.quit();
});
