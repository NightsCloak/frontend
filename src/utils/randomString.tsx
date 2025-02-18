function randomString(len: number) {
    let str = '';
    let i = 0;
    const min = 10;
    const max = 62;

    for (; i++ < len; ) {
        let r = (Math.random() * (max - min) + min) << 0;
        str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    }

    return str;
}

export default randomString;
