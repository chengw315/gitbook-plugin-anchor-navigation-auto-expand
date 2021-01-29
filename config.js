const defaultConfig = {
    autoExpand:true
}

function init(bookIns) {
    console.info("config init start");
    var config = bookIns.config.get('pluginsConfig')['anchor-navigation-auto-expand'];
    console.info("config init half");
    if (config == undefined) {
        console.warn("config not found，will use default config");
        return
    }
    if (config.autoExpand == undefined) {
        console.warn("config autoExpand not found，will use default config");
        return
    }
    console.info("get config");
    console.info(config.autoExpand);
    defaultConfig.autoExpand = config.autoExpand;
}

module.exports = {
    config: defaultConfig,
    init: init
}
