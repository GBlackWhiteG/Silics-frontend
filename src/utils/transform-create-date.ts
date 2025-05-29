import { getTransformedWord } from './transform-words';
import { EnumTimes } from '@/enums/time.enums';

export const transformCreateDate = (created_at: string) => {
	const date = new Date(created_at);
	const postedAgo = Math.floor((new Date().getTime() - date.getTime()) / 1000 / 60);

	const times: { [key: string]: [string, string, string] } = {
		minutes: ['минуту', 'минуты', 'минут'],
		hours: ['час', 'часа', 'часов'],
		days: ['день', 'дня', 'дней'],
	};

	if (postedAgo == 0) {
		return 'Только что';
	} else if (postedAgo < EnumTimes.MINUTUS) {
		return `${postedAgo} ${getTransformedWord(postedAgo, times['minutes'])} назад`;
	} else if (postedAgo < EnumTimes.HOURS) {
		return `${Math.floor(postedAgo / 60)} ${getTransformedWord(Math.floor(postedAgo / 60), times['hours'])} назад`;
	} else if (postedAgo < EnumTimes.DAYS) {
		return `${Math.floor(postedAgo / 1440)} ${getTransformedWord(Math.floor(postedAgo / 1440), times['days'])} назад`;
	} else {
		return `${date.toLocaleDateString('ru-RU')}`;
	}
};
