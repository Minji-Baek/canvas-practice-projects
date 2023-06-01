import Background from "./Background.js";
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
      new Wall({type: 'BIG' })
    ]
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
      delta = now - delta;
    
      if(delta < App.interval) return 
      App.ctx.clearRect(0, 0, App.width, App.height);

      this.backgrounds.forEach((background, index) => {
        // background.update();
        background.draw();
      })

      this.walls.forEach((wall, index) => {
        wall.update();
        wall.draw();
      })

      then = now - (delta % App.interval);

    }
    requestAnimationFrame(frame);
  }
}