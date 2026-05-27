import { Pipe, PipeTransform } from "@angular/core";

interface DateInfo {
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number
}

type TransformOption = "full" | "date";

const parseDate = (d: Date): DateInfo => {
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	const hour = d.getHours();
	const minute = d.getMinutes();
	const second = d.getSeconds();
	return {
		year,
		month,
		day,
		hour,
		minute,
		second
	};
};

const fmtToDate = (info: DateInfo): string => {
	return `${info.year}年${info.month}月${info.day}日`;
};

const fmtToDateime = (info: DateInfo): string => {
	return `${fmtToDate(info)} ${info.hour}时${info.minute}分${info.second}秒`;
};

@Pipe({
	name: "uiDatetime"
})
export class UiDatetimePipe implements PipeTransform {
	transform(value: Date, option?: TransformOption): string {
		const info = parseDate(value);
		if (option === "date") {
			return fmtToDate(info);
		}
		return fmtToDateime(info);
	}
}
