export const getTransformedWord = (num: number, forms: [string, string, string]) => {
	const lastNum = num % 10;
	const lastTwoNum = num % 100;

	if (lastTwoNum >= 10 && lastTwoNum <= 20) return forms[2];

	if (lastNum === 1) return forms[0];

	if (lastNum >= 2 && lastNum <= 4) return forms[1];

	return forms[2];
};
