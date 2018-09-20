/* Canvas JS Shim, by Trevor Reynolds
   Use in conjunction with Canvas CSS Shim
   For use in "User Javascript and CSS" Browser addon / plugin
   Select "https://rmit.instructure.com/courses" to effect just course pages.
*/

/* Get Course Shell number from url for individual styling. */
var urlArray = window.location.pathname.split("/");
var courseShell = urlArray[2];

/* Detect if page is speedgrader page. */
var isSpeedGrader=false;
if (urlArray[4])
  isSpeedGrader = (urlArray[4].indexOf('speed_grader') === 0);

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

/* Makes the course navigation "sticky"
   Magic Numbers: 25px and -40px work well now but this may change in the future. */
window.onscroll = function() {
  var minTop = Math.max(-40,(25-window.pageYOffset))+"px";
  //console.log(minTop);
  document.getElementById('left-side').style.top = minTop;
}

/* Inserts "Student View" link into course navigation */
if (document.getElementById('section-tabs')) {
  document.getElementById('section-tabs').innerHTML+='<li class="section"><a href="/courses/' + courseShell + '/student_view"  rel="nofollow" data-method="post">Student View</a></li>';
}

/* Allows discussion content to grow on screens larger than 640 x 480, removal of "stubborn" dynamically applied style */
document.getElementById('not_right_side').classList.remove('ic-app-main-content');

/* This was a nice idea to move rubric lines around but it doesn't work sadly 
  $( function() {
    $( "table.rubric_table tbody" ).sortable();
    $( ".table.rubric_table tbody" ).disableSelection();
  }); 
  */
