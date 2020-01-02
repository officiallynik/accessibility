const isEmpty = string => string.trim() === "";
const isNull = element => element === null;

import * as dom from "../../utils/dom";
import error from '../../utils/error';
import snippet from '../../utils/snippet';
import fix from '../../utils/fix';

//inside head of HTML
const hasDocumentType = () => {
  var errors = [];
  if (!dom.doctype) {
    let fixObj = {
      str: "Add <!DOCTYPE html>"
    }
    errors.push({
        error: error('Doctype is missing.'),
        snippet: snippet('none'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasDocumentTitle = () => {
  var errors = [];
  if (isEmpty(dom.title)) {
    let fixObj = {
      str: "<title>WELL DESCRIBED TITLE</title>"
    }
    errors.push({
        error: error('Title is missing.'),
        snippet: snippet('none'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasDocumentLanguage = () => {
  var errors = [];
  const HTML = dom.getElement("html");
  const hasLanguageAttr = dom.hasAttribute(HTML, "lang");

  if (hasLanguageAttr) {
    const getLanguageValue = dom.getAttribute(HTML, "lang");
    const isLanguageValueNotExist = isEmpty(getLanguageValue);

    if (isLanguageValueNotExist) {
      let fixObj = {
        str: "Add lang='LANGUAGE VALUE' to <html>"
      }
      errors.push({
          error: error('Language value is missing in HTML element.'),
          snippet: snippet('<html>...</html>'),
          fix: fix(fixObj)
      })
    }
  }
  return errors;
};

const hasDocumentMetaCharset = () => {
  var errors = [];
  const META = [...dom.getElements("meta")];
  const hasMetaCharset = META.some(tag => dom.hasAttribute(tag, "charset"));

  if (!hasMetaCharset) {
    let fixObj = {
      str: "Add <meta charset='utf-8'/>"
    }
    errors.push({
        error: error('Document encoding is missing.'),
        snippet: snippet('<head>...</head>'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasDocumentScalable = () => {
  var errors = [];
  const META = [...dom.getElements("meta")];
  const hasMetaScalable = META.some(
    el => dom.getAttribute(el, "user-scalable") === "no"
  );

  if (hasMetaScalable) {
    let fixObj = {
      str: "Remove user-scalable=no from <meta name=viewport>"
    }
    errors.push({
        error: error('Document must not use the user-scalable=no.'),
        snippet: snippet('none'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

//inside body of HTML
const hasHeadingOnce = () => {
  var errors = [];
  const H1 = dom.getElements("h1");
  const hasMultiHeading = H1.length > 1;

  if (hasMultiHeading) {
    let fixObj = {
      str: "Use only one <h1> in the page."
    }
    errors.push({
        error: error('Page has Multi <h1> tag.'),
        snippet: snippet('none'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasImagesAlt = () => {
  var errors = [];
  const IMGS = [...dom.getElements("img")];
  const imagesWithoutAlt = IMGS.filter(img => !dom.hasAttribute(img, "alt"));
  const imagesWithoutSrc = IMGS.filter(img => !dom.hasAttribute(img, "src"));
  const hasMissing = imagesWithoutAlt.length > 0 || imagesWithoutSrc.length > 0;

  if (hasMissing) {
    imagesWithoutAlt.forEach(image => {
      let fixObj = {
        str: "Add alt='IMAGE WELL DESCRIBED'"
      }
      errors.push({
          error: error('Image Alt is missing.'),
          snippet: snippet(image.outerHTML),
          fix: fix(fixObj)
      })
    });
    imagesWithoutSrc.forEach(image => {
      let fixObj = {
        str: "Add src='<source>'"
      }
      errors.push({
          error: error('Image Source is missing.'),
          snippet: snippet(image.outerHTML),
          fix: fix(fixObj)
      })
    });
  }
  return errors;
};

const hasLinksText = () => {
  var warnings = [];
  const LINKS = [...dom.getElements("a")];
  const warningMessage = "Link text is missing.";
  const linksWithoutText = LINKS.filter(
    link => isEmpty(link.textContent) && !dom.hasAccessibileText(link)
  );
  const hasMissingText = linksWithoutText.length > 0;

  if (hasMissingText) {
    linksWithoutText.forEach(link => {
      let fixObj = {
        str: "DESCRIBE PURPOSE OF LINK"
      }
      warnings.push({
          warning: error(warningMessage),
          snippet: snippet(link.outerHTML),
          fix: fix(fixObj)
      })
    });
  }
  return warnings;
};

const hasLinksHref = () => {
  var errors = [];
  const LINKS = [...dom.getElements("a")];
  const linksWithoutHref = LINKS.filter(
    link =>
      (!dom.hasAttribute(link, "href") ||
        isEmpty(dom.getAttribute(link, "href"))) &&
      !dom.hasAttribute(link, "role")
  );
  const hasMissingHref = linksWithoutHref.length > 0;

  if (hasMissingHref) {
    linksWithoutHref.forEach(link => {
      let fixObj = {
        str: "Add href='LINK URL'"
      }
      errors.push({
          error: error('Link Href is missing.'),
          snippet: snippet(link.outerHTML),
          fix: fix(fixObj)
      })
    });
  }
  return errors;
};

const hasSVGRole = () => {
  var errors = [];
  const SVGS = [...dom.getElements("SVG")];
  const hasMissingRole = SVGS.some(
    svg =>
      dom.getAttribute(svg, "aria-hidden") !== "true" &&
      !dom.hasAttribute(svg, "role") &&
      !dom.getAttribute(svg, "id")
  );

  if (hasMissingRole) {
    let fixObj = {
      str: "Add role='img' or (aria-hidden='true' if you need to hide element from SR)."
    }
    errors.push({
        error: error('SVG Role is missing.'),
        snippet: snippet('none'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasIframeTitle = () => {
  var errors = [];
  const IFRAMES = [...dom.getElements("iframe")];
  const iframeWithoutTitle = IFRAMES.some(
    ifrmae => !dom.hasAttribute(ifrmae, "title")
  );

  if (iframeWithoutTitle) {
    let fixObj = {
      str: "Add title='DESCRIBE CONTENT OF FRAME'"
    }
    errors.push({
        error: error('Title is missing in iframe.'),
        snippet: snippet('<iframe>'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasVideoTrack = () => {
  var errors = [];
  const VIDEOS = [...dom.getElements("video")];
  const videoWithoutTrack = VIDEOS.some(dom.hasTrack);

  if (videoWithoutTrack) {
    let fixObj = {
      str: "Add <track> element with subtitles, captions"
    }
    errors.push({
        error: error('Video track is missing.'),
        snippet: snippet('<video>'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasAudioTrack = () => {
  var errors = [];
  const AUDIOS = [...dom.getElements("audio")];
  const audioWithoutTrack = AUDIOS.some(dom.hasTrack);

  if (audioWithoutTrack) {
    let fixObj = {
      str: "Add <track> element with subtitles, captions"
    }
    errors.push({
        error: error('Audio track is missing.'),
        snippet: snippet('<audio>'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasPositiveTabIndex = () => {
  var errors = [];
  const ALLELEMENTS = [...dom.getElements("*")];
  const elementsWithTabindex = ALLELEMENTS.filter(
    element => dom.getAttribute(element, "tabindex") > 0
  );
  const hasPositiveindex = elementsWithTabindex.length > 0;

  if (hasPositiveindex) {
    let fixObj = {
      str: 'Remove/Replace tabindex=">0"'
    }
    errors.push({
        error: error('Avoid using positive integer values for tabindex.'),
        snippet: snippet('none'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const hasDuplicateIds = () => {
  var errors = [];
  const ALLELEMENTS = [...dom.getElements("*")];
  const elementsWithId = ALLELEMENTS.map(element =>
    dom.getAttribute(element, "id")
  ).filter(el => !isNull(el));
  const uniqueIds = [...new Set(elementsWithId)];
  const hasDuplicate = elementsWithId.length > uniqueIds.length;

  if (hasDuplicate) {
    let fixObj = {
      str: "Remove/Replace duplicate id"
    }
    errors.push({
        error: error('Avoid duplicate ids, ID must be unique.'),
        snippet: snippet('none'),
        fix: fix(fixObj)
    })
  }
  return errors;
};

const replaceWithStrongTag = () => {
  var errors = [];
  const ITAGS = [...dom.getElements("i"), ...dom.getElements("b")];
  if (ITAGS.length > 0) {
    ITAGS.forEach(tag => {
      let fixObj = {
        str: `Replace with <em> or <strong> tags`
      }
      errors.push({
          error: error(`Avoid using ${tag.outerHTML}.`),
          snippet: snippet(tag.outerHTML),
          fix: fix(fixObj)
      })
    });
  }
  return errors;
};

export {
  hasDocumentType,
  hasDocumentLanguage,
  hasDocumentTitle,
  hasDocumentScalable,
  hasHeadingOnce,
  hasImagesAlt,
  hasLinksText,
  hasLinksHref,
  hasSVGRole,
  hasIframeTitle,
  hasVideoTrack,
  hasAudioTrack,
  hasPositiveTabIndex,
  hasDuplicateIds,
  replaceWithStrongTag,
  hasDocumentMetaCharset
};