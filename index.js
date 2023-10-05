

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


const time = () =>{  
   let b = 0
 let ti =  setInterval(function(){
   if (b < 100) {
    let a = Math.floor(Math.random()*20);
    b = b+a
    document.querySelector("#loader h1").innerHTML = `${b}%`;
   }
   else{
    clearInterval(ti)
    b = 100
    document.querySelector("#loader h1").innerHTML = `${b}%`;
   }
   },80)
   
}

const tl = gsap.timeline();

    tl.to("#loader h1",{
        delay:0.5,
        duration:1,
        onLoad:time()
    })
    tl.to("#loader",{
        transform:"translateY(-100%)",
        duration:1.5,      
    })


gsap.to("#page1 h1",{
    transform:"translateX(-100%)",
    fontWeight:100,
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        markers:true,
        start:"top 0",
        end:"top -200%",
        scrub:3,
        pin:true
    }
})