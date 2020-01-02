const fix = fixObject => {
    let fixStr = 'Fix: '
    Object.values(fixObject).forEach(val => {
        fixStr+=val + ' '
    })
    return fixStr
}

export default fix;