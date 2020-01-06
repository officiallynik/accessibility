//2.3.3

import $ from 'jquery';
import error from '../../utils/error';
import snippet from '../../utils/snippet';
import fix from '../../utils/fix';

const isAnimated = () => {
    var warnings = [];
    $('*').each((i, el) => {
        if($(el).is(':animated')){
            let fixObj = {
                str: "Provide ways to diasble Animations to Users"
            }
            warnings.push({
                rule: 'WCAG 2.1: 2.3.3',
                warning: error('Animations are present.'),
                snippet: snippet(el.outerHTML),
                fix: fix(fixObj)
            })
        }
    })
    return warnings;
}


export {
    isAnimated
}