export function validateInn(inn, error = {}) {
	let result = false;

	if (typeof inn === 'number') {
		inn = inn.toString();
	} else if (typeof inn !== 'string') {
		inn = '';
	}

	if (!inn.length) {
		error.code = 1;
		error.message = 'Введите ИНН';
	} else if (/[^0-9]/.test(inn)) {
		error.code = 2;
		error.message = 'ИНН может состоять только из цифр';
	} else if ([10, 12].indexOf(inn.length) === -1) {
		error.code = 3;
		error.message = 'ИНН может состоять только из 10 или 12 цифр';
	} else {
		let checkDigit = function (inn, coefficients) {
			let n = 0;

			for (let i in coefficients) {
				n += coefficients[i] * inn[i];
			}
            
			return parseInt(n % 11 % 10);
		};

		switch (inn.length) {
			case 10:
				let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);

				if (n10 === parseInt(inn[9])) {
					result = true;
				}

				break;

			case 12:
				let n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				let n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                
				if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
					result = true;
				}

				break;

			default:
				result = false;
				break;
		}

		if (!result) {
			error.code = 4;
			error.message = 'Неправильное контрольное число';
		}
	}
	return result;
}

export function getNoun(number, one, two, five) {
    let n = Math.abs(number);

    n %= 100;

    if (n >= 5 && n <= 20) {
      return five;
    }

    n %= 10;

    if (n === 1) {
      return one;
    }

    if (n >= 2 && n <= 4) {
      return two;
    }

    return five;
}