/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/

"use strict";

togglbutton.render('.zhc-menu-bar.zhc-menu-bar--column:not(.toggl)', {observe: true}, function (elem) {
  // get the first column item to insert toggl before
  var firstLi = $(".zhc-menu-bar-item:first-child", elem);

  var li  = createTag("li", "zhc-menu-bar-item zhc-menu-bar-item--toggl");
  var div = createTag("div", "zhc-sidebar-selector zhc-sidebar-pipeline-selector");
  var h1  = createTag("h1");
  h1.innerText = "Toggl Timer";
  h1.setAttribute("style", "font-size: 1em; margin-bottom: 16px;")

  div.appendChild(h1); // add h1 to div

  // get the title and issue number from the title
  var m = $(".zhc-issue-description__title").textContent.match(/^(.+)#(\s?\d+)$/);
  var title = m[1];
  var issueNo = m[2];

  var repo;

  // in modal we need to get the issue path from here to support multiple repos
  var issuePath = $(".zhc-issue-modal__header__issue-path");
  if (!!issuePath) {
    var split = issuePath.textContent.split("#");
    repo = split[0];

    // just in case we don't get the issue number from the match above
    if (!!!issueNo) {
      issueNo = split[1];
    }
  }

  // we need to parse the page title when we are not in a "modal" mode.
  if (!!!repo) {
    var split = $("title").textContent.split(" - ");
    var lastN = split.length;
    repo = split[lastN-1];
  }

  // check
  if (issueNo === null || title === null || repo === null) {
    return;
  }

  var link = togglbutton.createTimerLink({
    className: 'zenhub',
    description: "["+repo+"#"+issueNo+"] " + title
  });

  div.appendChild(link);
  li.appendChild(div);

  // insert at the top of the column
  firstLi.parentNode.insertBefore(li, firstLi);
});
