const robot = require("robotjs");
const os = require('os');
const ifaces = os.networkInterfaces();
const mouseSpeed = 25;
class ComputerComponent {

    constructor() {

    }

    pressSpace() {
        robot.keyTap("space");
    }
    pressTabulator() {
        robot.keyTap("tab");
    }
    pressRight() {
        robot.keyTap("right");
    }
    pressLeft() {
        robot.keyTap("left");
    }
    pressEnter() {
        robot.keyTap("enter");
    }
    pressUp() {
        robot.keyTap("up");
    }
    pressDown() {
        robot.keyTap("down");
    }

    getMousePosX() {
        return robot.getMousePos().x;
    }

    getMousePosY() {
        return robot.getMousePos().y;
    }
    moveMouseToLeft() {
        var x = this.getMousePosX();
        var y = this.getMousePosY();
        if (x >= 10) {
            x -= mouseSpeed;
        }
        else{
            x = 0;
        }
        robot.setMouseDelay(2);
        robot.moveMouseSmooth(x, y);
    }
    moveMouseToRight() {
        var x = this.getMousePosX();
        var y = this.getMousePosY();
        x += mouseSpeed;
        robot.setMouseDelay(2);
        robot.moveMouseSmooth(x, y);
    }
    moveMouseToUp() {
        var x = this.getMousePosX();
        var y = this.getMousePosY();
        if(y >= 10){
            y -= mouseSpeed;
        }
        else{
            y = 0
        }
        robot.setMouseDelay(2);
        robot.moveMouseSmooth(x, y);
    }
    moveMouseToDown() {
        var x = this.getMousePosX();
        var y = this.getMousePosY();
        y += mouseSpeed;
        robot.setMouseDelay(2);
        robot.moveMouseSmooth(x, y);
    }
    getIp() {
        let address = "";
        Object.keys(ifaces).forEach(function (ifname) {
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    return;
                }
                address = iface.address;
            });
        });
        return address;
    }
    leftClick() {
        robot.mouseClick("left");
    }
    rightClick() {
        robot.mouseClick("right");
    }
    pauseAudio() {
        robot.keyTap("audio_pause");
    }
    nextSong() {
        robot.keyTap("audio_next");
    }
    previousSong() {
        robot.keyTap("audio_prev");
    }
    closeActualWindow() {
        robot.keyToggle('alt', "down");
        robot.keyTap('f4');
        robot.keyToggle('alt', 'up');
    }
}

module.exports = ComputerComponent;