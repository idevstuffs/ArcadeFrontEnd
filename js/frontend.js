var gui = require('nw.gui');
var fs = require('fs');

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

    self.selectedGameIndex = ko.observable(0);


    self.gamesOffset = ko.computed(function()
    {
        return ((35 * (self.selectedGameIndex() * -1)) + 37.5) + 'vw';
    });


    self.fnNextGame = function()
    {
        if (parseInt(self.selectedGameIndex()) < (parseInt(self.selectedSystem().games().length) - 1))
        {
            self.selectedGameIndex(parseInt(self.selectedGameIndex()) + 1);
        }
    };


    self.fnPrevGame = function()
    {
        if (parseInt(self.selectedGameIndex()) > 0)
        {
            self.selectedGameIndex(parseInt(self.selectedGameIndex()) - 1);
        }
    };


    self.keyPressed = function(event)
    {
        //Escape Key
        if (event.keyCode == 27)
        {
            gui.App.quit();
        }

        //Left Arrow Key
        if (event.keyCode == 37)
        {
            self.fnNextGame();
        }

        //Right Arrow Key
        if (event.keyCode == 39)
        {
            self.fnPrevGame();
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

    self.games = ko.observableArray();


    self.backgroundUrl = ko.computed(function()
    {
        return 'systems/' + self.code() + '/background.jpg';
    });


    self.consoleImageUrl = ko.computed(function()
    {
        return 'systems/' + self.code() + '/console.png';
    });


    self.cssBackgroundUrl = ko.computed(function()
    {
        return 'url("' + self.backgroundUrl() + '")';
    });


    self.cssConsoleImageUrl = ko.computed(function()
    {
        return 'url("' + self.consoleImageUrl() + '")';
    });


    fs.readdir('systems/' + self.code() + '/roms/', function(error, files)
    {
        if (error)
        {
            console.log('File Read Error: ' + error);

            return;
        }

        files.forEach(function(file)
        {
            var fileExtension = String(file).toLowerCase().split('.').pop();

            if (fileExtension == 'nes')
            {
                self.games.push(new classGame(self, self,
                {
                    'filename' : file
                }));
            }
        });
    });
};


var classGame = function(root, parent, game)
{
    var self = this;

    self.filename = ko.observable(game.filename);


    self.filenameNoExt = ko.computed(function()
    {
        return String(self.filename()).split('.').slice(0, -1).join('.');
    });


    self.imageUrl = ko.computed(function()
    {
        return 'systems/' + parent.code() + '/roms/' + self.filenameNoExt() + '.png';
    });
};
