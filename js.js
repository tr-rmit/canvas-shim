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

/* some "resistant" (dynamic) styles need an event to trigger */
window.onscroll = function() {

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
    console.log(uasPos);
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
  if (tags.length > 0) 
    for(let i=0; i<tags.length; i++)
      tags[i].parentNode.removeChild(tags[i]);
      
// Remove ellipses
  tags = document.getElementsByClassName('ellipsis');
  tagslen = tags.length;
  if (!isNaN(tagslen) ) {
    for(let i=0; i<tagslen; i++) {
      tags[i].style.textOverflow='clip';
    }
  }
  /* Dropdown box hard width override : WIP */
  document.getElementById('students_selectmenu-button').style.width = 'fit-content';
}

/* Inserts "Student View" link into course navigation */
if (document.getElementById('section-tabs')) {
  document.getElementById('section-tabs').innerHTML+='<li class="section"><a href="/courses/' + courseShell + '/student_view"  rel="nofollow" data-method="post">Student View</a></li>';
}

/* Allows discussion content to grow on screens larger than 640 x 480, removal of "stubborn" dynamically applied style */
// document.getElementById('not_right_side').classList.remove('ic-app-main-content');
