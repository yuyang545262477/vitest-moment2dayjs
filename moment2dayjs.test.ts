import {addDays, addMonths, differenceInDays, endOfDay, format, subDays, subMonths} from "date-fns";
import dayjs from "dayjs";

import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from "dayjs/plugin/relativeTime";
import utc from 'dayjs/plugin/utc'
import moment from "moment/moment";
import {beforeAll, describe, expect, test} from "vitest";

dayjs.extend(quarterOfYear);
dayjs.extend(utc);
dayjs.extend(relativeTime)

describe("测试moment2dayjs迁移代码", () => {
    let testDate;
    const InsertTime = "2023-07-27 12:16:48"
    beforeAll(() => {
        testDate = new Date();
    })
    test('test执行环境', () => {
        expect(typeof window).toBeTruthy()
    })
    test("moment2dayjs", () => {
        const momentDate = moment(testDate).toDate().getTime();
        const dayjsDate = dayjs(testDate).toDate().getTime();
        expect(momentDate).toBe(dayjsDate)
    })
    test("moment_toIOSTring(true)", () => {
        const momentDate = moment(testDate).toISOString(true);
        const dayjsDate = dayjs(testDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        expect(momentDate).toBe(dayjsDate)
    })
    //InsertTime: "2023-07-27 12:16:48"
    test('moment_fromNow', () => {
        require('dayjs/locale/zh-cn')
        moment.locale('zh-cn');
        dayjs.locale('zh-cn')
        // const InsertTime = "2023-07-27 12:16:48"
        const momentDate = moment(InsertTime).fromNow();
        console.log(momentDate);
        const dayjsDate = dayjs(InsertTime).fromNow();
        expect(momentDate).toBe(dayjsDate)
    })
    test('moment_toDate', () => {
        expect(moment().toDate()).toStrictEqual(dayjs().toDate())
    })
    /*time-select-extend.component.ts*/
    test('moment_subtract_1_y', () => {
        expect(moment().subtract(1, 'y').toDate()).toStrictEqual(dayjs().subtract(1, 'y').toDate())
    })
    test("moment_subtract_6_M", () => {
        expect(
            moment().subtract(6, 'M').toDate()
        ).toStrictEqual(
            dayjs().subtract(6, 'M').toDate()
        )
    })
    test("moment_subtract_3_M", () => {
        expect(
            moment().subtract(3, 'M').toDate()
        ).toStrictEqual(
            dayjs().subtract(3, 'M').toDate()
        )
    })
    /*ApiSensorService*/
    test("moment_toISOString", () => {
        expect(
            moment(testDate).toISOString()
        ).toBe(
            dayjs(testDate).toISOString()
        )
    })
    test("moment_toDate_getTime_1970-01-01", () => {
        expect(
            moment('1970-01-01 00:00:00').toDate().getTime()
        ).toBe(
            dayjs('1970-01-01 00:00:00').toDate().getTime()
        )
    })
    test("moment_toDate_getTime_1970-01-02", () => {
        expect(
            moment('1970-01-02 00:00:00').toDate().getTime()
        ).toBe(
            dayjs('1970-01-02 00:00:00').toDate().getTime()
        )
    })
    /*date2Time.helper.ts*/
    test('moment_setYear', () => {
        const momentDate = moment(InsertTime).set({
            year: 1970,
            month: 0,
            date: 1,
        }).toDate().getTime();
        const dayjsDate = dayjs(InsertTime).set('y', 1970).set('month', 0).set('date', 1).toDate().getTime();
        expect(momentDate).toBe(dayjsDate)
    })
    /*TransmitterHistoryLogic*/
    test('moment_add_1_month_add_1_minute', () => {
        const momentDate = moment(testDate).add(1, 'month').add(1, 'minute').toDate().getTime();
        const dayjsDate = dayjs(testDate).add(1, 'month').add(1, 'minute').toDate().getTime();
        expect(momentDate).toBe(dayjsDate)
    })
    /*TransmitterAlarmNearDataModalComponent*/
    test('moment_format(\'YYYY-MM-DD HH:mm:ss\')', () => {
        const momentDate = moment(InsertTime).format('YYYY-MM-DD HH:mm:ss');
        const dayjsDate = dayjs(InsertTime).format('YYYY-MM-DD HH:mm:ss');
        expect(momentDate).toBe(dayjsDate)
    })
    /*ManualComponent*/
    test("moment_.set({ hours: 0, minutes: 0, seconds: 0 }).toDate(),", () => {
        const momentDate = moment(InsertTime).set({hours: 0, minutes: 0, seconds: 0}).toDate();
        const dayjsDate = dayjs(InsertTime).set('h', 0).set('m', 0).set('s', 0).toDate();
        expect(momentDate).toStrictEqual(dayjsDate)
    })
    test("moment_set({ hours: 23, minutes: 59, seconds: 59 }).toDate()", () => {
        const momentDate = moment(InsertTime).set({hours: 23, minutes: 59, seconds: 59}).toDate();
        const dayjsDate = dayjs(InsertTime).set('h', 23).set('m', 59).set('s', 59).toDate();
        expect(momentDate).toStrictEqual(dayjsDate)
    })
    /*time.global.ts*/
    test("moment.add(1, \"month\").add(1, \"d\").toDate().getTime()", () => {
        const momentDate = moment(testDate).add(1, "month").add(1, "d").toDate().getTime();
        const dayjsDate = dayjs(testDate).add(1, "month").add(1, "d").toDate().getTime();
        expect(momentDate).toBe(dayjsDate)
    })
})

describe("测试date-fns2dayjs迁移代码", () => {
    const testDate = new Date();
    test("dateFns_endOfDay(addDays", () => {
        const tomorrow_midnight = endOfDay(addDays(new Date(), 1));
        const dayjsDate = dayjs().add(1, 'd').endOf('d').toDate();
        expect(tomorrow_midnight).toStrictEqual(dayjsDate)
    })
    //dateFns_differenceInDays
    test("dateFns_differenceInDays", () => {
        const tomorrow_midnight = dayjs(new Date()).add(1, 'd').endOf('d').toDate();
        const input = new Date(2000, 0, 2);
        const dateFns_result = differenceInDays(input, tomorrow_midnight);
        console.log(dateFns_result);
        const dayjs_result = dayjs(input).diff(tomorrow_midnight, 'd');
        expect(dateFns_result).toBe(dayjs_result)
    })
    test("dateFns_differenceInDays_logic", () => {
        const tomorrow_midnight = dayjs(new Date()).add(1, 'd').endOf('d').toDate();
        const input = new Date(2000, 0, 2);
        const firstReulst = differenceInDays(input, tomorrow_midnight) >= 0 || input < new Date(2000, 0, 1)
        const _x = differenceInDays(input, tomorrow_midnight)
        const secondResult = _x >= 0 || input < new Date(2000, 0, 1)
        expect(firstReulst).toBe(secondResult)

    })
    /*TimeSelectComponent*/
    test("dateFns_addMonths", () => {
        const dateFns_result = addMonths(testDate, 1);
        const dayjs_result = dayjs(testDate).add(1, 'M').toDate();
        expect(dateFns_result).toStrictEqual(dayjs_result)
    })
    test("dateFns_subMonths_1", () => {
        const dateFns_result = subMonths(testDate, 1);
        const dayjs_result = dayjs(testDate).subtract(1, 'M').toDate();
        expect(dateFns_result).toStrictEqual(dayjs_result)
    })
    test("dateFns_addDays_7", () => {
        const dateFns_result = addDays(testDate, 7);
        const dayjs_result = dayjs(testDate).add(7, 'd').toDate();
        expect(dateFns_result).toStrictEqual(dayjs_result)
    })
    test("dateFns_subDays_7", () => {
        const dateFns_result = subDays(testDate, 7);
        const dayjs_result = dayjs(testDate).subtract(7, 'd').toDate();
        expect(dateFns_result).toStrictEqual(dayjs_result)
    })
    test("dateFns_addDays_1", () => {
        const dateFns_result = addDays(testDate, 1);
        const dayjs_result = dayjs(testDate).add(1, 'd').toDate();
        expect(dateFns_result).toStrictEqual(dayjs_result)
    })
    test("dateFns_subDays_1", () => {
        const dateFns_result = subDays(testDate, 1);
        const dayjs_result = dayjs(testDate).subtract(1, 'd').toDate();
        expect(dateFns_result).toStrictEqual(dayjs_result)
    })
    /*TransmitterQueryAlarmComponent*/
    test("dateFns_format(record['ReportTime'], 'YYYY-MM-DD HH:mm:ss')", () => {
        const dateFns_result = format(testDate, 'yyyy-MM-dd HH:mm:ss');
        console.log(dateFns_result);
        const dayjs_result = dayjs(testDate).format('YYYY-MM-DD HH:mm:ss');
        expect(dateFns_result).toBe(dayjs_result)
    })
})
