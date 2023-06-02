import Background from "./Background.js";
import Player from "./Player.js";
import Wall from "./Wall.js";

export default class App{
  //app 전역에서 사용할 값
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio > 1 ? 2 : 1
  static fps = 70;
  static interval = 1000 / App.fps;
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({img: document.querySelector('#bg3-img'), speed: -1}),
      new Background({img: document.querySelector('#bg2-img'), speed: -2}),
      new Background({img: document.querySelector('#bg1-img'), speed: -4})
    ]
    this.walls = [
      new Wall({type: 'SMALL' })
    ];
    this.player = new Player();
    window.addEventListener('resize', this.resize.bind(this)) //bind this 하면 현재 부모인 app class가 바인드 됨
  }

  resize(){
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9 ; 
    //가로 > 세로: 가로 = innerheight 0.9,  가로 < 세로: 가로 = innerWidth * 0.9
    App.canvas.style.width = width + 'px';
    App.canvas.style.height = width * (3 / 4) + 'px'; // 4:3 비율
  }

  render(){
    let now, delta;
    let then = Date.now();

    
    const frame = ()=> {
      requestAnimationFrame(frame);
    
      now = Date.now();
      delta = now - then;
    
      if(delta < App.interval) return 
      App.ctx.clearRect(0, 0, App.width, App.height);
      
      
      //배경
      this.backgrounds.forEach((background, index) => {
        // background.update();
        background.draw();
      })

      //장애물
      for( let i = this.walls.length - 1 ; i >= 0; i--){
        // this.walls[i].update();
        this.walls[i].draw();

        if(this.walls[i].isOutside) {this.walls.splice(i, 1); continue}

        if(this.walls[i].canGenerateNext){
          this.walls[i].generatedNext = true;
          this.walls.push(new Wall({type: Math.random() > 0.3 ? 'SMALL' : 'BIG' }))
        }
      }

      this.player.update();
      this.player.draw();


      then = now - (delta % App.interval);

    }
    requestAnimationFrame(frame);
  }
}