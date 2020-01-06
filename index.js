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
            console.log('%c Rule: ' + err.rule, 'color: #725afa');
            console.log('%c Error: ' + err.error, 'color: #725afa');
            console.log('%c Code: ' + err.snippet, 'color: #725afa');
            console.log('%c Fix: ' + err.fix, 'color: #725afa');
            console.log('-----------------------------')
        })
    })

    console.log('COLOR CONTRAST ERRORS: ')
    accessibility.errors.contrastError.forEach(err => {
            console.log('%c Rule: ' + err.rule, 'color: #79f233');
            console.log('%c Error: ' + err.error, 'color: #79f233');
            console.log('%c Code: ' + err.snippet, 'color: #79f233');
            console.log('%c Fix: ' + err.fix, 'color: #79f233');
            console.log('-----------------------------')
    })

    console.log('INTERACTIONS BASED ERRORS: ')
    accessibility.errors.interactionError.forEach(arr => {
        arr.forEach(err => {
            console.log('%c Rule: ' + err.rule, 'color: #ff8554');
            console.log('%c Error: ' + err.error, 'color: #ff8554');
            console.log('%c Code: ' + err.snippet, 'color: #ff8554');
            console.log('%c Fix: ' + err.fix, 'color: #ff8554');
            console.log('-----------------------------')
        })
    })

    console.log('ARIA BASED ERRORS: ')
    accessibility.errors.ariaError.forEach(arr => {
        arr.forEach(err => {
            console.log('%c Rule: ' + err.rule, 'color: #ed8aa7');
            console.log('%c Error: ' + err.error, 'color: #ed8aa7');
            console.log('%c Code: ' + err.snippet, 'color: #ed8aa7');
            console.log('%c Fix: ' + err.fix, 'color: #ed8aa7');
            console.log('-----------------------------')
        })
    })



    console.log("----------------------------------------------------")
    console.log('WARNINGS: ');
    console.log('BASIC HTML WARNINGS: ')
    accessibility.warnings.htmlWarning.forEach(arr => {
        arr.forEach(err => {
            console.log('%c Rule: ' + err.rule, 'color: #725afa');
            console.log('%c Warning: ' + err.warning, 'color: #725afa');
            console.log('%c Code: ' + err.snippet, 'color: #725afa');
            console.log('%c Fix: ' + err.fix, 'color: #725afa');
            console.log('-----------------------------')
        })
    })

    console.log('INTERACTIONS BASED WARNINGS: ')
    accessibility.warnings.interactionWarning.forEach(arr => {
        arr.forEach(err => {
            console.log('%c Rule: ' + err.rule, 'color: #ff8554');
            console.log('%c Warning: ' + err.warning, 'color: #ff8554');
            console.log('%c Code: ' + err.snippet, 'color: #ff8554');
            console.log('%c Fix: ' + err.fix, 'color: #ff8554');
            console.log('-----------------------------')
        })
    })

    console.log('ARIA BASED WARNINGS: ')
    accessibility.warnings.ariaWarning.forEach(arr => {
        arr.forEach(err => {
            console.log('%c Rule: ' + err.rule, 'color: #ed8aa7');
            console.log('%c Warning: ' + err.warning, 'color: #ed8aa7');
            console.log('%c Code: ' + err.snippet, 'color: #ed8aa7');
            console.log('%c Fix: ' + err.fix, 'color: #ed8aa7');
            console.log('-----------------------------')
        })
    })
}

console.clear();
excuteFunc();