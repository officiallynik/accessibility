import $ from 'jquery';

//to get elements and its attr
const getElement = element => $(element)[0];
const getElements = element => $(element);

const hasAttribute = (element, attribute) => !!$(element).attr(attribute);
const getAttribute = (element, attribute) => $(element).attr(attribute);

const doctype = document.doctype;
const title = document.title;

const hasAccessibileText = element => hasAttribute(element, 'aria-label') || hasAttribute(element, 'aria-labelledby');

const hasTrack = track => track.textTracks.length === 0;

export {
  getElement, getElements,
  hasAttribute, getAttribute,
  doctype, title,
  hasAccessibileText,hasTrack
}