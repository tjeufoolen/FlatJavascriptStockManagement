const { Page } = require('../pages/Page');

export class DrawableCanvas extends Page {
    constructor() {
        super();
    }

    generateDrawableCanvas(){

        this.canvas = this.createElement("canvas", []);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 800;
        this.canvas.height = 400; 
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.bounds = this.canvas.getBoundingClientRect();


        this.flag = false;

        this.prevX = 0;
        this.currX = 0;
        this.prevY = 0;
        this.currY = 0;
        this.dot_flag = false;

        this.x = "black";
        this.y = 2;

        this.initEventListeners();

        return this.canvas;
    }

    initEventListeners(){
        let _self = this;
        this.canvas.addEventListener("mousemove", function (e) {
            _self.findxy('move', e)
        }, false);
        this.canvas.addEventListener("mousedown", function (e) {
            _self.findxy('down', e)
        }, false);
        this.canvas.addEventListener("mouseup", function (e) {
            _self.findxy('up', e)
        }, false);
        this.canvas.addEventListener("mouseout", function (e) {
            _self.findxy('out', e)
        }, false);
    }

    draw() {                        
        this.ctx.beginPath();

        this.ctx.lineWidth = 4;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'black';

        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(this.currX, this.currY);
        this.ctx.stroke();

        this.ctx.closePath();
    }

    findxy(res, e) {
        if (res == 'down') {
            this.prevX = this.currX;
            this.prevY = this.currY;
            
            let newPos = this.getMousePos(this.canvas, e);
            
            this.currX = newPos.x;
            this.currY = newPos.y;

            this.flag = true;
            this.dot_flag = true;
            if (this.dot_flag) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.x;
                this.ctx.fillRect(this.currX, this.currY, 2, 2);
                this.ctx.closePath();
                this.dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            this.flag = false;
        }
        if (res == 'move') {
            if (this.flag) {
                this.prevX = this.currX;
                this.prevY = this.currY;
                
                let newPos = this.getMousePos(this.canvas, e);
            
                this.currX = newPos.x;
                this.currY = newPos.y;
                this.draw();
            }
        }
    }

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
      
        return {
          x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
          y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    }
    
}
