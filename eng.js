let config = {
    modulePath: './modules/',
    dataPath: '',
    canvas: {
        id: 'canvas',
        width: 1920,
        height: 1080,

        status: 1,

        fixedUpdateDuration: 30,
        lastUpdateTime: 0,

        update: () => {
            canvas.ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);

            updateFunc();

            const now = Date.now();
            if (now - config.canvas.lastUpdateTime > config.canvas.fixedUpdateDuration) {
                config.canvas.lastUpdateTime = now;
                fixedUpdateFunc();
            }

            if (config.canvas.status === 1) {
                window.requestAnimationFrame(config.canvas.update);
            }
        },
    },
    onResize: () => {
        canvas.setSize(config.canvas.width, config.canvas.height);
    },
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
                    script.src = config.modulePath + path;

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
                        if (id[0] == config.dataPath) id = id.splice(1, id.length - 1);

                        for (const ext of ['png', 'jpeg', 'jpg', 'gif'])
                            id[id.length - 1] = id[id.length - 1].replace(`.${ext}`, '');

                        id = id.join('.');

                        images[id] = img;

                        loadedFiles++;
                        res(id);
                    }

                });

                totatFiles++;
                await promise;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}

let canvas;
Load.script('canvas/camera.js', 'canvas/canvas.js').then(() => {
    canvas = new Canvas(document.getElementById(config.canvas.id));
    config.onResize();
    window.addEventListener('resize', config.onResize);
})

let rectangle;
Load.script('2d/sprite.js', '2d/rectangle.js').then(() => {
    rectangle = new Rectangle(canvas, 0, 20, "red", 0, "", 0, 540)
    updateFunc = () => {
        rectangle.draw();
    }
    fixedUpdateFunc = () => {
        rectangle.width = (loadedFiles / totalFiles) * config.canvas.width;
        
    }
    config.canvas.update();
})