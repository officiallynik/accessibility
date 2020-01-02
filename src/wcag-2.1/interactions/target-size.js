//2.5.5

import * as dom from '../../utils/dom';
import error from '../../utils/error';
import snippet from '../../utils/snippet';
import fix from '../../utils/fix';

import $ from 'jquery'

const isTouchable = () => {
    var warnings = [];

    const TOUCHABLES = [...dom.getElements('input'), ...dom.getElements('button'), ...dom.getElements('img')]

    const hasMinSize = TOUCHABLE => {
        const width = $(TOUCHABLE).css('width').split('px')[0];
        const height = $(TOUCHABLE).css('height').split('px')[0];
        if(width<44 || height<44){
            let fixObj = {
                str: (width<44? "Increase Width to atleast 44px": "Increase Height to atleast 44px")
            }
            warnings.push({
                warning: error('Touchable element size is less than the minimum required'),
                snippet: snippet(TOUCHABLE.outerHTML),
                fix: fix(fixObj)
            })
        }
    }

    TOUCHABLES.forEach(hasMinSize);
    return warnings;
}

export default isTouchable;