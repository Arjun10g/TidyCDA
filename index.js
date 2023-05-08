function clampBuilder( minWidthPx, maxWidthPx, minFontSize, maxFontSize ) {
    const root = document.querySelector( "html" );
    const pixelsPerRem = Number( getComputedStyle( root ).fontSize.slice( 0,-2 ) );
  
    const minWidth = minWidthPx / pixelsPerRem;
    const maxWidth = maxWidthPx / pixelsPerRem;
  
    const slope = ( maxFontSize - minFontSize ) / ( maxWidth - minWidth );
    const yAxisIntersection = -minWidth * slope + minFontSize
  
    return `clamp( ${ minFontSize }rem, ${ yAxisIntersection }rem + ${ slope * 100 }vw, ${ maxFontSize }rem )`;
  }

console.log(clampBuilder( 320, 1200, 1.5, 2 ));

// Header Title animation
let darkBg = document.querySelector('.dark-bg');
let titleText = document.querySelector('#title');
let titleTextPadding = window.getComputedStyle(titleText).padding;
let animationWidth = titleText.offsetWidth - parseInt(titleTextPadding);
let darkBgHeight = darkBg.offsetHeight;
titleText.parentElement.style.marginBottom = darkBgHeight + 'px';

// Split letters in titleText into spans
let titleTextSplit = titleText.textContent.split('');
console.log(titleTextSplit);
titleText.textContent = '';
for (let i = 0; i < titleTextSplit.length; i++) {
    let span = document.createElement('span');
    span.textContent = titleTextSplit[i];
    titleText.appendChild(span);
}

let timeline = gsap.timeline();

timeline.from('#title span', {
    opacity: 0,
    y: 200,
    blur: 10,
    stagger: 0.1,
    duration: 1
}).to(titleText, {
    backgroundPosition: `${animationWidth}px 0px`,
    ease: "power1.inOut",
    duration: 3
}, ">").to(titleText, {
    opacity: 0,
    duration: 1}, ">")
    .set('.intro', {
    display: "none",
    }, ">");


// Icon functionality

let icon = document.querySelector('.icon i');

icon.addEventListener('click', () => {
    gsap.to('.sidebar', {
        x: "-110%",
        duration: 0.5
    });
});

let icon2 = document.querySelector('.left-icon i');

icon2.addEventListener('click', () => {
    gsap.to('.sidebar', {
        x: "0%",
        duration: 0.5
    });
});

// Content Loading

let items = document.querySelectorAll('h3[class *= "item"]');
let content = document.querySelectorAll('div[class *= "content"]');

items.forEach((item,index) => {
    let checkKeys = [...Array(10).keys()];
    checkKeys = checkKeys.filter(key => key !== index)
    item.addEventListener('click', () => {
    content[index].style.display = "block";

    checkKeys.forEach(key => {
        content[key].style.display = "none";
    });


    });
});
