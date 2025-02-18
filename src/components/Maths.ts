let DecimalPrecision = (function () {
    if (Math.trunc === undefined) {
        Math.trunc = function (v) {
            return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
    }
    let powers = [
        1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16, 1e17, 1e18, 1e19,
        1e20, 1e21, 1e22,
    ];
    let intpow10 = function (power: number) {
        if (power < 0 || power > 22) {
            return Math.pow(10, power);
        }
        return powers[power];
    };
    let isRound = function (num: number, decimalPlaces: number) {
        // return decimalPlaces >= 0 && +num.toFixed(decimalPlaces) === num;
        let p = intpow10(decimalPlaces);
        return Math.round(num * p) / p === num;
    };
    let decimalAdjust = function (type: string, num: number, decimalPlaces: number) {
        if (type !== 'round' && isRound(num, decimalPlaces || 0)) return num;
        let p = intpow10(decimalPlaces || 0);
        let n = num * p * (1 + Number.EPSILON);
        // if (Math[type] instanceof Function) {
        //     return Math[type](n) / p;
        // }
        switch (type) {
            case 'ceil':
                return Math.ceil(n) / p;
            case 'floor':
                return Math.floor(n) / p;
            case 'trunc':
                return Math.trunc(n) / p;
            default:
                return 0;
        }
    };
    return {
        // Decimal round (half away from zero)
        round: function (num: number, decimalPlaces: number) {
            return decimalAdjust('round', num, decimalPlaces);
        },
        // Decimal ceil
        ceil: function (num: number, decimalPlaces: number) {
            return decimalAdjust('ceil', num, decimalPlaces);
        },
        // Decimal floor
        floor: function (num: number, decimalPlaces: number) {
            return decimalAdjust('floor', num, decimalPlaces);
        },
        // Decimal trunc
        trunc: function (num: number, decimalPlaces: number) {
            return decimalAdjust('trunc', num, decimalPlaces);
        },
        // Format using fixed-point notation
        toFixed: function (num: number, decimalPlaces: number) {
            return decimalAdjust('round', num, decimalPlaces).toFixed(decimalPlaces);
        },
    };
})();

export { DecimalPrecision };
