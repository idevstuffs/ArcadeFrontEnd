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



var classFrontend = function()
{
    var self = this;

    self.title = ko.observable('merp');

    self.systems = ko.observableArray();
    self.selectedSystem = ko.observable();

    self.systems.push(new classSystem(self, self,
    {
        'code' : 'nes',
        'year' : '1985',
        'bits' : '8-Bit',
        'name' : 'Nintendo Entertainment System'
    }));


    self.keyPressed = function(event)
    {
        if (event.keyCode == 27)
        {
            gui.App.quit();
        }
    }


    self.init = function()
    {
        //Select first system
        self.selectedSystem(self.systems()[0]);

        //Register any events
        document.addEventListener('keydown', self.keyPressed, false);
    }


    self.init();
};


var classSystem = function(root, parent, system)
{
    var self = this;

    self.code = ko.observable(system.code);
    self.name = ko.observable(system.name);
    self.year = ko.observable(system.year);
    self.bits = ko.observable(system.bits);


    self.backgroundUrl = ko.computed(function()
    {
        return 'systems/' + self.code() + '/background.jpg';
    });


    self.cssBackgroundUrl = ko.computed(function()
    {
        return 'url("' + self.backgroundUrl() + '")';
    });
};
