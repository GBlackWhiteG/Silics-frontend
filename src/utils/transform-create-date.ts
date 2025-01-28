import { EnumTimes } from '@/enums/time.enums';
import { getTimeString } from './transform-words';

export const transformCreateDate = (postedAgo: number) => {
	const times: { [key: string]: [string, string, string] } = {
		minutes: ['минуту', 'минуты', 'минут'],
		hours: ['час', 'часа', 'часов'],
		days: ['день', 'дня', 'дней'],
	};

	if (postedAgo == 0) {
		return 'Только что';
	} else if (postedAgo < EnumTimes.MINUTUS) {
		return `${postedAgo} ${getTimeString(postedAgo, times['minutes'])} назад`;
	} else if (postedAgo < EnumTimes.HOURS) {
		return `${Math.floor(postedAgo / 60)} ${getTimeString(Math.floor(postedAgo / 60), times['hours'])} назад`;
	} else if (postedAgo < EnumTimes.DAYS) {
		return `${Math.floor(postedAgo / 1440)} ${getTimeString(Math.floor(postedAgo / 1440), times['days'])} назад`;
	} else {
		return 'Давненько';
	}
};
