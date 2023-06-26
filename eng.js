class Module {
    constructor(id) {
        this.id = id;
    }
}

let updateFunc = () => { };

let fixedUpdateFunc = () => { };

let update = () => {
    canvas.ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);
    canvas.ctx.fillStyle = "blue";
    canvas.ctx.fillRect(0, 0, canvas.htmlElement.width, canvas.htmlElement.height);

    updateFunc();

    /*const now = Date.now();
    if (now - config.canvas.lastUpdateTime > config.canvas.fixedUpdateDuration) {
        config.canvas.lastUpdateTime = now;
        fixedUpdateFunc();
    }*/

    grid.draw();
    gui.draw();

    window.requestAnimationFrame(update);
};

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

let loadingLine;
// load default modules
Load.script('config.js', './modules/lang/lang.js', './modules/gmath/gmath.js', './modules/canvas/camera.js', './modules/canvas/canvas.js', './modules/canvas/grid.js', './modules/input/mouse.js', './modules/input/keyboard.js', './modules/gui/gui.js', './modules/gui/text.js', './modules/gui/button.js', './modules/2d/sprite.js', './modules/2d/rectangle.js').then(() => {
    loadingLine = new Rectangle(0, 20, "red", 0, "", 0, 540)
    updateFunc = () => {
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
            SceneFunc()
            grid.recalculatePositionRelativeCanvasForAllObjects();
        }
        loadingLine.drawRelativeCanvas();
    }
    fixedUpdateFunc = () => {
    }
    for (const path of config.preload.images) {
        Load.image(path)
    }
    for (const path of config.preload.scripts) {
        Load.script(path)
    }
    update();
})

let SceneFunc = () => { };
