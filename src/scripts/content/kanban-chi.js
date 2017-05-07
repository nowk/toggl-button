/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/

"use strict";

togglbutton.render('.details--card:not(.toggl)', {observe: true}, function (elem) {
  var link;

  var container     = createTag("div", "aside-section aside-section--toggl");
  var sectionTiming = $('.aside-section--timing', elem);
  var description   = $('.card-details__title-textarea', elem);

  // NOTE not sure this is the most ideal way to get the ID for a card, but I
  // could not find a reference to a card ID in the source tree
  var urlPath = window.location.pathname;
  var id = "";
  var pathSplit = urlPath.split("/"); // eg /dashboard/123/d-456/c-ard-id
  if (pathSplit.length >= 5) {
    id = "#" + pathSplit[pathSplit.length - 1] + " ";
  }

  if (description === null || container === null || sectionTiming === null) {
    return;
  }

  // FIXME when clicking the close or done button it closes the drawer, this is
  // most likely the native functionality of kanban-chi's aside panel
  link = togglbutton.createTimerLink({
    className: 'kanban-chi',
    description: id + description.value
  });

  container.appendChild(link);

  // add the container after the timing section
  sectionTiming.parentNode.insertBefore(container, sectionTiming);
});
