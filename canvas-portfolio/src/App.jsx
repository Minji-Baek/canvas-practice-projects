import { useEffect, useRef, useState } from 'react';
import ArrowImg from './assets/arrow.svg';
import Nudake from './containers/Nudake';
import RotateCanvas from './containers/RotateCanvas';
import CountDown from './containers/CountDown';
import MiniGame from './containers/MiniGame';
import ParticleDemo from './containers/ParticleDemo';
import gsap from 'gsap';

function App() { 
  const [endCount, setEndCount] = useState(true);


  const [canvas, setcanvas] = useState("photo");
  const [isPhoto, setIsPhoto] = useState(true);

  const [isDemo, setIsDemo] = useState(false);

  // const particleEnd = (data) => {
  //   set
  // }

  const changeCountDown = (data) =>{
    //app 을 disappear
    setEndCount(data)
  };

  useEffect(() => {
    if(endCount) return;

    const port = document.querySelector(".app");
    gsap.fromTo(port,{opacity: 0}, {
      opacity: 1, 
      duration: 2,
    })
   
          
  },[endCount]) //app disappear
  

  useEffect(()=>{
    console.log("canvas 값이 바뀌고 있어용")
    if(canvas === "photo"){
      setIsPhoto(current=> current = true);
      setIsDemo(current => current = false);
    }else if( canvas === "particle-demo"){
      setIsPhoto(current=> current = false);
      setIsDemo(current => current = true);
    }else{
      setIsPhoto(current=> current = false);
      setIsDemo(current => current = false);
    }
  }, [canvas]) //canvas값 바뀌는 곳
  
  useEffect(()=>{
   
  }, [isDemo]) 

  useEffect(()=>{

  },[isPhoto])
  
  const changeMain = (e) => {
     setcanvas(current => current = e.target.id)
  }

  return (
    // <React.Fragment> === <>
    <>
    {
      endCount 
      ?  
      <div className='count'>
        <CountDown changeDown={changeCountDown} />
      </div>
     :
     <>
     <div className="app" >
       <section className="section-1">
         <header>
           <h1>Canvas Portfolio</h1>
           <ul>
             <li id='photo' className='list-items' onClick={changeMain} >photo</li>
             <li id='particle-demo' className='list-items' onClick={changeMain} >particle-demo</li>
             <li id='minigame' className='list-items' onClick={changeMain} >minigame</li>
           </ul>
         </header>
       {/*  isEndDemo={isEndDemo}  */}
         <main>
           <div>
           { isPhoto ? <Nudake />  :  (  isDemo  ?   <ParticleDemo /> : <MiniGame/> ) }</div>
         </main>
       </section>
       
       <section className="section-2">
        { canvas ? <p>Did you click photo?</p> : <p>Have a fun!</p>}

       </section>
       <section className="section-3">
         <aside>
           <div className="top">
             1914 translation by H. Rackham
           </div>
           <div className="bottom">
             <img src={ArrowImg} />
             <img src={ArrowImg} />
           </div>
         </aside>
         <article>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
         </article>
       </section>
       <section className='section-4'>
         <RotateCanvas />
       </section>
     </div>
       <footer>

       <div className='email'>emilyback@naver.com</div>
     </footer>
   </>
    }
    
     
    </>
  )
}


export default App


