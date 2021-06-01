/* Canvas JS Shim, by Trevor Reynolds
   Use in conjunction with Canvas CSS Shim
   For use in "User Javascript and CSS" Browser addon / plugin
   Select "https://rmit.instructure.com/courses" to effect just course pages.
*/

/* Get Course Shell number from url for individual styling. */
var urlArray = window.location.pathname.split("/");
var courseShell = urlArray[2];

/* Detect if page is speedgrader page. */
var isSpeedGrader = urlArray[4] ? 
  urlArray[4].indexOf('speed_grader') === 0 :
  false;

/* Use courseShell to style each of your courses individually, for example the background, by adding a new case block */

switch (courseShell) {
  
  case '249': // WP1797
    document.getElementById('not_right_side').style.background = `repeating-linear-gradient(-45deg,
        #fff 0px,  #eee 4px, 
        #fff 8px,  #fff 16px)`;
    break;
    
  case '13846': // WP1810
    document.getElementById('application').style.backgroundColor = '#fff9f0';
    break;  
    
  default:
    document.getElementById('not_right_side').style.backgroundColor = 'white';
}

/* Call when document is ready */
$(function () {
  
  /* Inserts "Student View" link into course navigation */
  if (document.getElementById('section-tabs')) {
    document.getElementById('section-tabs').innerHTML+='<li class="section"><a href="/courses/' + courseShell + '/student_view"  rel="nofollow" data-method="post">Student View</a></li>';
  }

});

/* some "resistant" (dynamic) styles need an event to trigger */
var hFixed=[];
window.onscroll = function() {
  
// Fix the f*cking headings!
  let hSizes=["dummy","2rem","1.9rem","1.7rem","1.5rem","1.3rem","1.2rem"];
  let hColrs=["dummy",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)"];
  for (let h=1; h<=6; h++) {
    let hs = document.getElementsByTagName('h'+h);
    if (hs.length && !hFixed[h]) {
      for(tag=0; tag<hs.length; tag++) {
        console.log(hs[tag].style);
        if (!hs[tag].classList.contains('banner-title')) {
          hs[tag].setAttribute('style',
          'font-family: "Museo500", "Helvetica Neue", Helvetica, Arial, sans-serif !important; ' + 
          'margin: 0.5em 0em !important; ' +
          'font-size: '+ hSizes[h] + " !important; " +
          'color: ' +    hColrs[h] + " !important; " +
          'font-weight: initial !important; ' +
          'font-style: initial !important; ');        
        }
      }
      hFixed[h] = true;
    }
  }

/* Retired Feature: makes the course navigation and unenrolled students "sticky"
   Magic Numbers: 25px and -0px (nav) works well now but this may change in the future. 
  var ls = document.getElementById('left-side');
// wtf? There are two of them?  
  var uas = document.getElementsByClassName('unassigned-students')[1]; 
  var minTop = Math.max(-0,(25-window.pageYOffset))+"px";
  ls.style.top = minTop;
  minTop = Math.max(0,(window.pageYOffset-270))+"px";
  if (uas) {
    if(uas.style.position != 'relative')
      uas.style.position = 'relative';
    uas.style.top=minTop;
  } */
  
  /* Unassigned Students Feature: forces unenrolled students to be "sticky" */
  var uas = document.getElementsByClassName('unassigned-students');
  if (uas.length>0) {
    // get the last one
    uas = uas[uas.length-1];
    let uasPos = uas.getBoundingClientRect();
    //console.log(uasPos);
    let uasStartTop = 227; // magic number
    minTop = Math.max(0,(window.pageYOffset-uasStartTop))+"px";
    if (uas) {
      if(uas.style.position != 'relative')
        uas.style.position = 'relative';
      uas.style.top=minTop;
    }
  } 
  
  // Remove brs to increase realestate in groups area
  var tags = document.getElementsByClassName('show-group-full');
  if (tags.length) 
    for(let i=0; i<tags.length; i++)
      tags[i].parentNode.removeChild(tags[i]);
      
// Remove ellipses
  tags = document.getElementsByClassName('ellipsis');
  tagslen = tags.length;
  if (tags.length) {
    for(let i=0; i<tagslen; i++) {
      tags[i].style.textOverflow='clip';
    }
  }
  
  /* Dropdown box hard width override : WIP */
  if (document.getElementById('students_selectmenu-button'))
    document.getElementById('students_selectmenu-button').style.width = 'fit-content';
  
}

/* 20210521 Shelved: Speed Grader: Replace long description pop up link with actual long description text, unfortunately the long descriptions aren't in the document, suspect they are requested one by one
var rh = document.getElementById("rubric_holder");
if (rh) {
  console.log("rubric_holder found");
  // look for long desriptions
  vldt = setInterval(function() {
    vld = rubric_holder.querySelectorAll("div.long-description");
    console.log(vld);
    if (vld.length > 0) {
      clearTimeout(vldt);
      cld = document.querySelectorAll("span[aria-label='Criterion Long Description']");
      console.log(cld);
    }
  }, 1000);
}
*/
