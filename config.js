const defaultConfig = {
    autoExpand:true
}

function init(bookIns) {
    console.info("config init start");
    var config = bookIns.config.get('pluginsConfig')['anchor-navigation-ex'];
    console.info("config init half");
    if(config !== undefined && config.autoExpand !== undefined) {
        defaultConfig.autoExpand = config.autoExpand;
    }
    console.info("config init over")
    console.info(defaultConfig.autoExpand)
}

module.exports = {
    config: defaultConfig,
    init: init
}
