import { createStatisticsData } from './statisticsData.js';

export const toLoadStatistic = () => JSON.parse(localStorage.getItem('statistic')) || createStatisticsData();
export const saveStatistic = (statistic) => localStorage.setItem('statistic', JSON.stringify(statistic));
export const clearStatistic = () => localStorage.removeItem('statistic');
