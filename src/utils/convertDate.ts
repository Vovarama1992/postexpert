import dayjs from "dayjs";
import ru from 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ru';

dayjs.locale(ru)
dayjs.extend(duration)

const convertDate = (value: string, format: string = 'DD MMMM YYYY HH:mm') => {
    return dayjs(value).format(format)
};

export {
    convertDate,
}
