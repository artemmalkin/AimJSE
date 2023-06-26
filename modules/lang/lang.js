let langDict = {};

YaGames
    .init()
    .then(ysdk => {
        config.lang = ysdk.environment.i18n.lang === 'ru' ? 'ru' : 'en';
        Load.script(`./assets/lang/${config.lang}.js`);
    })
    .catch(console.error);
