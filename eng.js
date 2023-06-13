let config = {
    assetsPath: 'assets',
    canvas: {
        id: 'canvas',
        width: 1920,
        height: 1080,

        status: 1,

        fixedUpdateDuration: 30,
        lastUpdateTime: 0,

        update: () => {
            canvas.ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);
            canvas.ctx.fillStyle = "blue";
            canvas.ctx.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);

            updateFunc();

            const now = Date.now();
            if (now - config.canvas.lastUpdateTime > config.canvas.fixedUpdateDuration) {
                config.canvas.lastUpdateTime = now;
                fixedUpdateFunc();
            }

            gui.draw();

            if (config.canvas.status === 1) {
                window.requestAnimationFrame(config.canvas.update);
            }
        },
    },
    onResize: () => {
        canvas.setSize(config.canvas.width, config.canvas.height);
    },
    preload: {
        images: ['./assets/images/player.png'],
        scripts: ['./modules/2d/animationSprite.js', './modules/2d/animationSpriteProperty.js'],
    }
}

let updateFunc = () => { };

let fixedUpdateFunc = () => { };

let totalFiles = 0, loadedFiles = 0;

let images = {};

const Load = {
    script: async function (...args) {
        try {
            for (const path of Object.values(args)) {
                const promise = new Promise((res, rej) => {
                    const script = document.createElement('script');
                    script.onload = () => {
                        loadedFiles++;
                        res(true)
                    }
                    script.onerror = () => rej(path);
                    script.type = 'text/javascript';
                    script.src = path;

                    document.head.appendChild(script);
                });

                totalFiles++;
                await promise;
            }
        }
        catch (err) {
            console.error(err);
        }
    },
    image: async function (...args) {
        try {
            for (const path of Object.values(args)) {
                const promise = new Promise((res, rej) => {
                    const img = new Image();
                    img.src = path;

                    img.onload = () => {
                        let id = path.split('/');

                        if (id[0] == '.') id = id.splice(1, id.length - 1);
                        if (id[0] == config.assetsPath) id = id.splice(1, id.length - 1);

                        for (const ext of ['png', 'jpeg', 'jpg', 'gif'])
                            id[id.length - 1] = id[id.length - 1].replace(`.${ext}`, '');

                        id = id.join('.');

                        images[id] = img;

                        loadedFiles++;
                        res(id);
                    }

                });

                totalFiles++;
                await promise;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}

let canvas;
let mouse;
let keyboard;
let gui;
let loadingLine;
Load.script('./modules/canvas/camera.js', './modules/canvas/canvas.js', './modules/input/mouse.js', './modules/input/keyboard.js', './modules/gui/gui.js', './modules/gui/text.js', './modules/gui/button.js', './modules/2d/sprite.js', './modules/2d/rectangle.js').then(() => {
    canvas = new Canvas(document.getElementById(config.canvas.id));
    config.onResize();
    window.addEventListener('resize', config.onResize);

    mouse = new Mouse();
    keyboard = new Keyboard();
    gui = new GUI();

    loadingLine = new Rectangle(canvas, 0, 20, "red", 0, "", 0, 540)
    updateFunc = () => {
        loadingLine.draw();
    }
    fixedUpdateFunc = () => {
        loadingLine.width = (loadedFiles / totalFiles) * config.canvas.width;
        if (loadedFiles === totalFiles) {
            fixedUpdateFunc = () => { };
            console.log("Loading Done!")
            YaGames
                .init()
                .then(ysdk => {
                    ysdk.features.LoadingAPI?.ready();
                })
                .catch(console.error);
            // start the game
            loadScene()
        }
    }
    for (const path of config.preload.images) {
        Load.image(path)
    }
    for (const path of config.preload.scripts) {
        Load.script(path)
    }
    config.canvas.update();
})

let loadScene = () => {
    let sprite = new Sprite(images['images.player'], 64, 64, 0, 0, 5, 0, 0)
    //let animationProp = new AnimationSpriteProperty(sprite, 9, 200)
    //animationProp.propertyAnimation.scale = [6, 7, 8, 9, 10, 9, 8, 7, 6]
    //animationProp.propertyAnimation.y = [0, -100, -200, -300,-400, -300, -200, -100, 0, ]
    let animation = new AnimationSpriteSheet(sprite, 3, 200)
    let testText = new _Text(0, 60, "Hello World", "serif", 40, "red", "white", 2)
    let testButton = new Button(0, 60, 100, 100, new Sprite(images['images.player'], 64, 64, -50, -100, 5, 0, 0), testText, () => {console.log("button clicked!")})
    gui.elements = [testButton]
    updateFunc = () => {
        animation.draw();
    }
}
