/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/
'use strict';

togglbutton.render('#partial-discussion-sidebar:not(.toggl)', {observe: true}, function (elem) {
  var div = createTag("div", "discussion-sidebar-item");
  var h1  = createTag("h1");
  h1.innerText = "Toggl Timer";
  h1.setAttribute("style", "font-size: 1em; margin-bottom: 16px;")

  div.appendChild(h1); // add h1 to div

  var repo    = $("a", $('[itemprop="name"]')).getAttribute("href").replace(/^\//, "");
  var title   = $(".js-issue-title").textContent.trim();
  var issueNo = $(".gh-header-number").textContent.trim().replace(/^#/, "");

  // support zenhub and multiple repos
  var zenhubTitle = $(".zh-issueviewer-title-item");
  if (zenhubTitle) {
    var split = zenhubTitle.textContent.trim().split("#");
    repo = split[0];

    // just in case we don't get the issue number from the selector above
    if (!!!issueNo) {
      issueNo = split[1];
    }
  }

  // check
  if (issueNo === null || title === null || repo === null) {
    return;
  }

  var link = togglbutton.createTimerLink({
    className: 'github',
    description: "["+repo+"#"+issueNo+"] " + title
  });

  div.appendChild(link);

  // NOTE this does not always put it at the top when other extensions compete
  // for it, eg. Zenhub
  // that is why we setTimeout...
  setTimeout(function() {
    elem.prepend(div);
  }, 200);
});
