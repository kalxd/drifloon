/**
 * 自定义的错误类型，与原始Error区别开。
 */
export class AppError {
	/**
	 * 自定义的错误状态码，不与Http Status Code挂钩。
	 */
	code: number;
	/**
	 * 具体的错误信息，由服务端返回。
	 */
	msg: string;

	constructor(code: number, msg: string) {
		this.code = code;
		this.msg = msg;
	}
}

/**
 * 快速构建非Http请求的错误信息，
 * 该错误用于应用内部错误，且无关紧要。
 */
function mkInnerError(msg: string): AppError {
	return new AppError(-1, msg);
}

export const fmtErrorMsg = (e: unknown): string => {
	if (e instanceof AppError) {
		return e.msg;
	}
	else if (e instanceof Error) {
		return e.message;
	}
	else if (typeof e === "string") {
		return e;
	}

	return "未知错误";
};

export function alertErrorMsg(e: unknown): void {
	const msg = fmtErrorMsg(e);
	alert(msg);
};

type SubscriptionOption = {
	error: (e: unknown) => void;
}

export const subscriptionAll: SubscriptionOption = {
	error: alertErrorMsg
};
