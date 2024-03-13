import { get } from './api_helper';
import * as url from './url';

const getLogsClients = (query) => get(`${url.logs}?${query}`);
const getEventsLogs = () => get(`${url.logs}/listHistoryLogsActions`);

export { getLogsClients, getEventsLogs };
