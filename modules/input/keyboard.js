class Keyboard {
    constructor() {
        this.bind = {
            keydown: {
            },
            keyup: {
                "Escape": () => { console.log("Pause") }
            }
        };

        document.addEventListener(
            "keydown",
            (event) => {
                const keyName = event.key;
                console.log(`${keyName} pressed `);
                keyboard.bind.keydown[keyName]?.();
            },
            false
        );

        document.addEventListener(
            "keyup",
            (event) => {
                const keyName = event.key;
                console.log(`${keyName} was released`);
                keyboard.bind.keyup[keyName]?.();
            },
            false
        );
    }
}