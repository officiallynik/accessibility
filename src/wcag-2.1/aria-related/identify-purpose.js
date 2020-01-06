//1.3.5 and 1.3.6 will be covered here

import * as dom from "../../utils/dom";
import error from "../../utils/error";
import snippet from "../../utils/snippet";
import fix from "../../utils/fix";

const isEmpty = string => string.trim() === "";

//1.3.5
const inputsHaveAutoComplete = () => {
  var errors = [];
  const INPUTS = [...dom.getElements("input")];
  const hasAutoComplete = input => {
    if (
      !dom.hasAttribute(input, "autocomplete") ||
      isEmpty(dom.getAttribute(input, "autocomplete"))
    ) {
      let fixObj = {
        str: "Add autocomplete='INPUT PURPOSE'"
      };
      errors.push({
        rule: 'WCAG 2.1: 1.3.5',
        error: error("AutoComplete is missing in input tag."),
        snippet: snippet(input.outerHTML),
        fix: fix(fixObj)
      });
    }
  };

  INPUTS.forEach(hasAutoComplete);
  return errors;
};

//1.3.6
const sectionsHaveAriaTag = () => {
  var warnings = [];
  const TAGS = [
    ...dom.getElements("section"),
    ...dom.getElements("forms"),
    ...dom.getElements("nav"),
    ...dom.getElements("main")
  ];
  const hasAriaTag = tag => {
    if (!dom.hasAttribute(tag, "role")) {
      let fixObj = {
        str: "Add role='PURPOSE'"
      };
      warnings.push({
        rule: 'WCAG 2.1: 1.3.6',
        warning: error(
          "Using ARIA landmarks to identify regions of a page is Missing."
        ),
        snippet: snippet(tag.outerHTML),
        fix: fix(fixObj)
      });
    }
  };
  TAGS.forEach(hasAriaTag);
  return warnings;
};

export { inputsHaveAutoComplete, sectionsHaveAriaTag };
