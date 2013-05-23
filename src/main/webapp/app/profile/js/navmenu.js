$(function() {
    if (!window.Hrcms)
        window.Hrcms = {};

    Hrcms.NavMenu = {};
    Hrcms.NavMenu.create = function(config) {
        var tThis = {};
        var nav = $('<div class="hrcms-secondary-menu"/>').appendTo(config.container);
        nav.css("width", config.width);
        nav.css("height", config.height);
        var activeItem = null;
        var Section = {};
        Section.create = function(sectionName) {
            var tThis = {};
            var section = $('<div/>').appendTo(nav);
            var sectionTitle = $('<div class="hrcms-secondary-menu-section"></div>').appendTo(section);
            sectionTitle.html(sectionName);
            var sectionContent = $('<ul class="hrcms-secondary-submenu"/>').appendTo(section);
            //Operation functions
            tThis.addItem = function(itemName) {
                var item = $('<li><a><span class="hrcms-secondary-menu-text"/></a></li>').appendTo(sectionContent);
                item.on('click', function(event, ui) {
                    if (activeItem !== null)
                        activeItem.toggleClass('hrcms-h-active');
                    activeItem = $(this);
                    activeItem.toggleClass('hrcms-h-active');
                });
                var itemTitle = item.find('span');
                itemTitle.html(itemName);
                return item;
            }
            //end
            return tThis;
        }
        tThis.configure = function(config) {
            var callback = config.event_callback;
            var sections = config.settings;
            for (var i = 0; i < sections.length; ++i) {
                var section = Section.create(sections[i].title);
                var items = sections[i].items;
                for (var j = 0; j < items.length; ++j) {
                    var item = section.addItem(items[j].title);
                    if (callback)
                        item.on('click', callback);
                }
            }
        }
        //end
        return tThis;
    }
})