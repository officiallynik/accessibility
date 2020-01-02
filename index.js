import * as accessibility from './src';

const excuteFunc = () => {

    accessibility.htmlCheck();
    accessibility.colorContrast();
    accessibility.interactions();
    accessibility.ariaRelated();

    console.log("----------------------------------------------------")
    console.log('ERRORS: ');
    console.log('BASIC HTML ERRORS: ')
    accessibility.errors.htmlError.forEach(arr => {
        arr.forEach(err => {
            console.log(err);
        })
    })

    console.log('COLOR CONTRAST ERRORS: ')
    accessibility.errors.contrastError.forEach(err => {
        console.log(err)
    })

    console.log('INTERACTIONS BASED ERRORS: ')
    accessibility.errors.interactionError.forEach(arr => {
        arr.forEach(err => {
            console.log(err);
        })
    })

    console.log('ARIA BASED ERRORS: ')
    accessibility.errors.ariaError.forEach(arr => {
        arr.forEach(err => {
            console.log(err);
        })
    })



    console.log("----------------------------------------------------")
    console.log('WARNINGS: ');
    console.log('BASIC HTML WARNINGS: ')
    accessibility.warnings.htmlWarning.forEach(arr => {
        arr.forEach(err => {
            console.log(err);
        })
    })

    console.log('INTERACTIONS BASED WARNINGS: ')
    accessibility.warnings.interactionWarning.forEach(arr => {
        arr.forEach(err => {
            console.log(err);
        })
    })

    console.log('ARIA BASED WARNINGS: ')
    accessibility.warnings.ariaWarning.forEach(arr => {
        arr.forEach(err => {
            console.log(err);
        })
    })
}

console.clear();
excuteFunc();