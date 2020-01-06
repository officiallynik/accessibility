var html = require("./wcag-2.1/html-check");
var ContrastPlugin = require("./wcag-2.1/color-contrast");
var interaction = require("./wcag-2.1/interactions");
var aria_related = require("./wcag-2.1/aria-related");

var errors = {
  htmlError: [],
  contrastError: null,
  interactionError: [],
  ariaError: []
};

var warnings = {
  htmlWarning: [],
  interactionWarning: [],
  ariaWarning: []
}

const htmlCheck = () => {
  errors.htmlError.push(html.hasDocumentType());
  errors.htmlError.push(html.hasDocumentTitle());
  errors.htmlError.push(html.hasDocumentLanguage());
  errors.htmlError.push(html.hasDocumentMetaCharset());
  errors.htmlError.push(html.hasDocumentScalable());
  errors.htmlError.push(html.hasHeadingOnce());
  errors.htmlError.push(html.hasImagesAlt());
  warnings.htmlWarning.push(html.hasLinksText());
  errors.htmlError.push(html.hasLinksHref());
  errors.htmlError.push(html.hasSVGRole());
  errors.htmlError.push(html.hasIframeTitle());
  errors.htmlError.push(html.hasVideoTrack());
  errors.htmlError.push(html.hasAudioTrack());
  errors.htmlError.push(html.hasDuplicateIds());
  errors.htmlError.push(html.replaceWithStrongTag());

  errors.htmlError = errors.htmlError.filter(function(arr) {
    return arr.length > 0;
  });
  warnings.htmlWarning = warnings.htmlWarning.filter(function(arr) {
    return arr.length > 0;
  });
};

const colorContrast = () => {
  errors.contrastError = ContrastPlugin.ContrastPlugin();
};

const interactions = () => {
  errors.interactionError.push(interaction.hasSingleKeyShortcut());
  warnings.interactionWarning.push(interaction.isAnimated());
  warnings.interactionWarning.push(interaction.isTouchable());

  errors.interactionError = errors.interactionError.filter(function(arr) {
    return arr.length > 0;
  });
  warnings.interactionWarning = warnings.interactionWarning.filter(function(arr) {
    return arr.length > 0;
  });
};

const ariaRelated = () => {
  errors.ariaError.push(aria_related.inputsHaveAutoComplete());
  errors.ariaError.push(aria_related.hasButtonsText());
  errors.ariaError.push(aria_related.hasForLabel());
  errors.ariaError.push(aria_related.hasFormsLabel());
  warnings.ariaWarning.push(aria_related.hasLinksTarget());
  warnings.ariaWarning.push(aria_related.sectionsHaveAriaTag());


  errors.ariaError = errors.ariaError.filter(function(arr) {
    return arr.length > 0;
  });
  warnings.ariaWarning = warnings.ariaWarning.filter(function(arr) {
    return arr.length > 0;
  });
};

export { htmlCheck, colorContrast, interactions, ariaRelated, errors, warnings };
