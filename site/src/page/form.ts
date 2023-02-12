import IORef from "drifloon/data/ioref";
import { Color, Size } from "drifloon/data/var";
import { Header } from "drifloon/header";
import { Radiobox, RadioboxAttr } from "drifloon/input";
import * as m from "mithril";
import { Either, Just, Left, Maybe, Nothing, Right } from "purify-ts";
import { Button } from "drifloon/button";
import { alertMsg } from "drifloon/modal";
import { Form, FormAttr, TextField } from "drifloon/form";
import { liftEitherA2 } from "drifloon/data/fn";
import { FormData } from "drifloon/data/form";

interface RadioItem {
	key: number;
	text: string;
}

const radioItems: Array<RadioItem> = [
	{ key: 1, text: "第一个" },
	{ key: 2, text: "第二个"}
];

const RadioS = (): m.Component => {
	const ref = new IORef<Maybe<RadioItem>>(Nothing);

	const alertRef = () => {
		ref.ask()
			.caseOf({
				Just: x => alertMsg(JSON.stringify(x)),
				Nothing: () => alertMsg("你还未选择")
			})
	};

	return {
		view: () => {
			const attr: RadioboxAttr<RadioItem> = {
				value: ref.ask(),
				items: radioItems,
				cmp: (value, item) => value.key === item.key,
				renderItem: item => item.text,
				onchange: x => ref.put(Just(x))
			};

			return [
				m(Radiobox, attr),
				m(Button, { onclick: alertRef }, "查看结果")
			];
		}
	};
};

const ValidationS = (): m.Component => {
	interface User {
		name: string;
		address: string;
	}

	interface Output {
		name: string;
		address: Maybe<string>;
	}

	const mkOutput = (name: Output["name"], address: Output["address"]): Output => ({
		name,
		address
	});

	const notEmpty = (input: string): Either<string, string> => {
		if (input.length === 0) {
			return Left("不能为空");
		}
		return Right(input);
	};

	const validate = (user: User): Either<string, Output> => liftEitherA2(
		mkOutput,
		notEmpty(user.name),
		Right(Maybe.fromFalsy(user.address))
	);

	const user = new FormData<User>({
		name: "",
		address: ""
	});

	return {
		view: () => {
			const attr: FormAttr<User> = {
				formdata: user
			};

			const onsubmit = () => user.validate(validate)
				.ifRight(s => alertMsg(JSON.stringify(s, null, 4)));

			return m(Form, attr, [
				m(TextField, {
					label: "用户名",
					isRequire: true,
					onchange: s => user.putAt("name", s)
				}),
				m(TextField, {
					label: "地址",
					onchange: s => user.putAt("address", s)
				}),
				m(Button, { onclick: onsubmit, color: Color.Blue }, "提交")
			]);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.pink.segment", [
			m(Header, { size: Size.Huge, isDivid: true }, "表单"),
			m(Header, { size: Size.Large }, "表单基本验证"),
			m(ValidationS),
			m(Header, { size: Size.Large }, "其他杂物"),
			m(RadioS)
		])
	}
};

export default Main;
