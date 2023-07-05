import { FormData } from "drifloon/data/ref";
import { Color, Size } from "drifloon/data/var";
import { Header } from "drifloon/element/header";
import * as m from "mithril";
import { Either, Maybe, Right } from "purify-ts";
import { Button } from "drifloon/element/button";
// import { alertMsg } from "drifloon/module/modal";
import { Form, FormAttr, TextField } from "drifloon/module/form";
import { prefix, notEmpty } from "drifloon/data/validate";
import { eitherZipWith } from "drifloon/data/fn";



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

	const validate = (user: User): Either<string, Output> => eitherZipWith(
		mkOutput,
		notEmpty(user.name).mapLeft(prefix("用户名")),
		Right(Maybe.fromFalsy(user.address))
	);

	const user = new FormData<User>({
		name: "",
		address: "一组默认地址！"
	});

	return {
		view: () => {
			const attr: FormAttr<User> = {
				formdata: user
			};

			const onsubmit = () => user.validate(validate)
				.ifRight(s => console.log(JSON.stringify(s, null, 4)));

			return m(Form, attr, [
				m(TextField, {
					label: "用户名",
					isRequire: true,
					value: user.askAt("name"),
					onchange: s => user.putAt("name", s)
				}),
				m(TextField, {
					label: "地址",
					value: user.askAt("address"),
					onchange: s => user.putAt("address", s)
				}),
				m(Button, { connectClick: onsubmit, color: Color.Blue }, "提交")
			]);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.pink.segment", [
			m(Header, { size: Size.Huge, isDivid: true }, "表单"),
			m(Header, { size: Size.Large }, "表单基本验证"),
			m(ValidationS)
		])
	}
};

export default Main;
