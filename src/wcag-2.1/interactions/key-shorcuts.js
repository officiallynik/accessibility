import $ from 'jquery';
import error from '../../utils/error';
import snippet from '../../utils/snippet';
import fix from '../../utils/fix';

//2.1.4: Character Key Shortcuts: single key shortcuts should be avoided

const hasSingleKeyShortcut = () => {
    var errors = [];

    var e = $.Event("keydown", () => {
        let fixObj = {
            str: "Avoid using Single Key Shortcuts"
        }
        errors.push({
            error: error(`Single Key Shortcuts found: ${e.key}.`),
            snippet: snippet('none'),
            fix: fix(fixObj)
        })
    });

    for(var i=65; i<90; i++){
        e.which = i;
        $(document).trigger(e);
    }

    for(var i=97; i<122; i++){
        e.which = i;
        $(document).trigger(e);
    }

    return errors;
}


export {
    hasSingleKeyShortcut
}