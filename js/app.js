'use strict';

function init() {

    const dots = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    const bgs = [
         `linear-gradient( #2b3760, #0b1023)`,
         `linear-gradient( #4e3022, #161616)`,
         `linear-gradient( #4e4342, #161616)`
    ]

    // tracker
    let current = 0;
    let scrollSlide = 0;


    dots.forEach( (dot, index ) => 
        dot.addEventListener('click', function() {
            changeDots(this);
            nextPage(index);
            scrollSlide = index;
        })
    )


    function changeDots(dot) {
       dots.forEach(dot => dot.classList.remove('active'));
       dot.classList.add('active');
       
    }
    
    function nextPage(pgNum) {
         const nextPage = pages[pgNum];
         const currentPage = pages[current];

         if(nextPage == currentPage) return;

         const nextLeft = nextPage.querySelector('.hero .model-left');
         const nextRight = nextPage.querySelector('.hero .model-right');
         const currentLeft = currentPage.querySelector('.hero .model-left');
         const currentRight = currentPage.querySelector('.hero .model-right');

         const nextText = nextPage.querySelector('.details');
         const portfolio = document.querySelector('.portfolio');

        // gsap timeline
        const tl = gsap.timeline({ 
            onStart: () => {
                dots.forEach(dot => dot.style.pointerEvents = 'none');
            },

            onComplete: () => {
                dots.forEach(dot => dot.style.pointerEvents = 'all');
            }
        });

        tl.fromTo(currentLeft, 0.3, {y: '-10%'}, {y: '-100%'})
          .fromTo(currentRight, 0.3, {y: '10%'}, {y: '-100%'}, '-=0.2')

          .to(portfolio, 0.3, {backgroundImage: bgs[pgNum]})
          .fromTo(currentPage, 0.3, {opacity: 1, pointerEvents: 'all'}, {opacity: 0, pointerEvents: 'none'})

          .fromTo(nextPage, 0.3, {opacity: 0, pointerEvents: 'none'}, {opacity: 1, pointerEvents: 'all'}, '-=0.6')
          .fromTo(nextLeft, 0.3, {y: '-100%'}, {y: '-10%'}, '-=0.6')
          .fromTo(nextRight, 0.3, {y: '-100%'}, {y: '10%'}, '-=0.8')
        //   .fromTo(nextText, 0.3, {opacity: 0, y: '30%'}, {opacity: 1, y: '0'})
          .fromTo(nextText, 0.3, {opacity: 0}, {opacity: 1})
          .set(nextLeft, {clearProps: 'all'})
          .set(nextRight, {clearProps: 'all'})

        current = pgNum;
    }

    const hamburger = document.querySelector('.menu');
    const menuLines = document.querySelectorAll('.menu-line');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');

    const tl = gsap.timeline({ paused: true, reversed: true });
    tl.to(navOpen, 0.5, { y: 0} )
      .fromTo(contact, 0.5, { opacity: 0, y: 10}, { opacity: 1, y: 0}, '-=0.1')
      .fromTo(social, 0.5, { opacity: 0, y: 10}, { opacity: 1, y: 0}, '-=0.5')
      .fromTo(logo, 0.2, {color: 'white'}, {color: 'black'}, '-=1')
      .fromTo(menuLines, 0.2, {stroke: 'white'}, {stroke: 'black'} , '-=1')


    hamburger.addEventListener('click', () => {
        tl.reversed() ? tl.play() : tl.reverse();
    });
   







    // optional , change page on scroll with mouse wheel since we hidden scrollbar on body, does't work on mobile
    document.addEventListener('wheel', throttle(scrollChange, 1500));
    // for mobile 
    // document.addEventListener('touchmove', throttle(scrollChange, 1500));

    function switchDots(dotNum) {
        const activeDot = document.querySelectorAll('.slide')[dotNum];
        dots.forEach(dot => dot.classList.remove('active'));
        activeDot.classList.add('active');
    }

    function scrollChange(e) {

        if (e.deltaY > 0)  scrollSlide += 1;
        else scrollSlide -= 1;

        if (scrollSlide > 2)  scrollSlide = 0;
        

        if (scrollSlide < 0) scrollSlide = 2;
        
        switchDots(scrollSlide);
        nextSlide(scrollSlide);
    }

}

/////////////////////////////////////////////////////////////////////////////


function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout( () => (inThrottle = false), limit)
        }
    }
}







init();