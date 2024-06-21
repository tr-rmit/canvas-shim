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

/*
switch (courseShell) {
  
  case '249': // WP1797
  case '95590': // PS2202
    document.getElementById('application').style.background = `repeating-linear-gradient(-45deg,
        #fff 0px,  #fff 14px, 
        #efefef 14px,  #efefef 16px)`;
    break;
  case '92574': // WP2250v
    document.getElementById('application').style.background = `repeating-linear-gradient(-45deg,
        #fff 0px,  #fff 14px, 
        #dfefff 14px,  #dfefff 16px)`;
    break;
  case '13846': // WP1810
  case '96724': // WP2237
    document.getElementById('application').style.background = `repeating-linear-gradient(-45deg,
        #fff 0px,  #fff 14px, 
        #ffefef 14px,  #ffefef 16px)`;
    break;  
    
  default:
    document.getElementById('application').style.backgroundColor = 'var(--tr-bg-color)';
}
*/

var hFixed=[];
var activeSGPF = false;
window.ondblclick = function(event) {
  console.log("Trev: ondblclick");
  /* Prefill empty Speed Grader comment box */
  if (isSpeedGrader) {
    if (event.srcElement.id == 'speed_grader_comment_textarea' && event.srcElement.value.trim() == '') {
      let studFName = document.getElementById('students_selectmenu-button').getElementsByClassName('ui-selectmenu-item-header')[0].innerHTML.trim().split(' ')[0];
      event.srcElement.value = `Hi ${studFName},
        
Thank you for submitting your assessment. 
Unfortunately there is an issue are some issues preventing us from marking your assignment:

- No website is available on Coreteaching servers.
- We are unable to access your GitHub, please register your non-sid username in the form provided in the Canvas assignment header area, and make sure that superfluffy kittenz is added as a collaborator.
- Your GitHub repository is not private.
- Your version on GitHub does not match your version on Coreteaching.
- Files are not protected with .htaccess.
- Your code does not pass validation, check your code in the nu validator.
- "Insert your name here" is an instruction.
- Your profile image is too large, it must be physically 200px x 200px (ie "on disk"), and it must be named avatar.png.

Fix this up these things and send me an email when you are ready for re-grading. Sama and I are happy to catch up with you need assistance for a 1 on 1.

Trevor.`;
    } // comment box
    
  } // speedgrader
} // window.dblclick


/* Call when document is ready 
   20230325: Putting all "need serious delay" styles in delayedLoad
   20240621: 1 ... nope, 2 second delay after load seems to work
*/
window.addEventListener('load', function() {
  setTimeout(delayedLoad, 2000);
});

/* 20230325: Some "resistant" (dynamic) styles and elements need a delayed "afterload" event to take effect, called when document is ready */
function delayedLoad() {
  
  /* Fix the f*cking headings! */
  let hSizes=["dummy","2rem","1.9rem","1.7rem","1.5rem","1.3rem","1.2rem"];
  let hColrs=["dummy",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)",
  "var(--ic-brand-global-nav-menu-item__text-color)"];
  for (let h=1; h<=6; h++) { 
    if (!hFixed[h]) {
    // Are we on a modules page?
      let hs = document.getElementsByClassName('show-content')[0];
    /* If not, are we on a discussions page?
       20210603 Update: This doesn't work so well
      if (!hs)
        hs = document.getElementById('discussion_container'); */
      if (hs)
        hs = hs.getElementsByTagName('h'+h);
      if (hs?.length) {
        for(tag=0; tag<hs.length; tag++) {
          console.log(hs[tag].style);
          if (!hs[tag].classList.contains('banner-title')) {
            hs[tag].setAttribute('style',
            'font-family: "Museo500", "Helvetica Neue", Helvetica, Arial, sans-serif !important; ' + 
            'margin: 0.5em 0em !important; ' +
            'font-size: '+ hSizes[h] + " !important; " +
            // 20200426: Remove color change 'color: ' +    hColrs[h] + " !important; " +
            'font-weight: initial !important; ' +
            'font-style: initial !important; ');        
          }
        }
        hFixed[h] = true;
      }      
    }
  }
  
  if (isSpeedGrader) {
    
    /* Clicking "view rubric" button opens all the feedback boxes in reverse order,
       puts focus in first by default.
    */

    $(".toggle_full_rubric.edit.btn").click(function(){
      $($(".react-rubric td:last-child button").get().reverse()).trigger("click");
    });



    /* make quiz comment boxes larger and usable */

    let head = $("#speedgrader_iframe").contents().find("head");

    console.log(head);
    let css = '<style>div.quiz_comment {width: calc(100% - 90px); } div.quiz_comment textarea { width: calc(100% - 20px) !important; height: 100px !important; }</style>';
    $(head).append(css);

  } // speedgrader
  
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
