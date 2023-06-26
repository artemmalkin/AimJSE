let config = {
    lang: 'en',
    assetsPath: 'assets',
    canvas: {
        id: 'canvas',
        width: () => window.innerWidth,
        height: () => window.innerHeight,

        status: 1,

        fixedUpdateDuration: 30,
        lastUpdateTime: 0,
    },
    preload: {
        images: ['./assets/images/player.png'],
        scripts: ['./modules/2d/circle.js', './modules/2d/animationSprite.js', './modules/2d/animationSpriteProperty.js', './scripts/game/game.js'],
    }
}