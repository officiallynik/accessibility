//2.5.3, 1.4.13 and commented out features in html check 

import * as dom from '../../utils/dom';
import error from '../../utils/error';
import snippet from '../../utils/snippet';
import fix from '../../utils/fix';

const isEmpty = string => string.trim() === '';

const hasLinksTarget = () => {
    var warnings = []

    const LINKS = [...dom.getElements('a')];
    const warningMessage = 'Hint message is missing. Should add hint message to recognize this link will open in new tab.'
    const linksWithTarget = LINKS.filter(link => dom.getAttribute(link, 'target') === '_blank' && !dom.hasAttribute(link, 'aria-describedby'));
    const hasTarget = linksWithTarget.length > 0;

    if (hasTarget){
        linksWithTarget.forEach(link => {
            let fixObj = {
                str: "Add aria-describedby='ELEMENT ID'"
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

const hasButtonsText = () => {
    var errors= []
    const BUTTONS = [...dom.getElements('button')];
    const warningMessage = 'Button text or aria-label is missing';
    const buttonsWithoutText = BUTTONS.filter(button => isEmpty(button.textContent) && !dom.hasAccessibileText(button));
    const hasMissingText = buttonsWithoutText.length > 0;

    if (hasMissingText){
        buttonsWithoutText.forEach(button => {
            let fixObj = {
                str: "Add aria-label='VALUE' or <button>VALUE</button>"
            }
            errors.push({
                error: error(warningMessage),
                snippet: snippet(button.outerHTML),
                fix: fix(fixObj)
            })
        });
    }
    return errors;
};

const hasForLabel = () => {
    var errors = [];
    const LABELS = [...dom.getElements('label')];
    const isLabeld = label => {
        if (!dom.hasAttribute(label, 'for') || isEmpty(dom.getAttribute(label, 'for'))){
            let fixObj = {
                str: "Add for='INPUT ID'"
            }
            errors.push({
                error: error('For is missing in label.'),
                snippet: snippet(label.outerHTML),
                fix: fix(fixObj)
            })
        }
    };

    LABELS.forEach(isLabeld);
    return errors;
};

const hasFormsLabel = () => {
    var errors = []
    const FORMS = [...dom.getElements('form')];
    const formsWithoutLabels = FORMS.some(form => !dom.hasAccessibileText(form));

    if (formsWithoutLabels){
        let fixObj = {
            str: "Add aria-label, aria-labelledby"
        }
        errors.push({
            error: error('Forms Label is missing.'),
            snippet: snippet('<form>'),
            fix: fix(fixObj)
        })
    }
    return errors;
};

export {
    hasLinksTarget, hasButtonsText,
    hasForLabel, hasFormsLabel
}