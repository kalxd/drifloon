import { FormData } from "drifloon/data/ref";
import { Color, EmLevel, Size, Wide } from "drifloon/data/var";
import { Header, Header2 } from "drifloon/element/header";
import * as m from "mithril";
import { Either, Just, Maybe, Right } from "purify-ts";
import { Button } from "drifloon/element/button";
import { Field, FieldGrid, RequireField } from "drifloon/element/form";
// import { alertMsg } from "drifloon/module/modal";
import { Form, FormAttr } from "drifloon/module/form";
import { validate, isNotEmpty } from "drifloon/data/validate";

const FormS: m.Component = {
	view: () => {
		return m(Form, [
			m(FieldGrid, { wide: Wide.Two }, [
				m(Field, [
					m("label", "用户名"),
					m("input")
				]),
				m(RequireField, [
					m("label", "密码"),
					m("input", { type: "password" })
				]),
			]),
			m(FieldGrid, [
				m(Field, { wide: Wide.Twelve }, [
					m("label", "用户名"),
					m("input")
				]),
				m(RequireField, { wide: Wide.Four }, [
					m("label", "密码"),
					m("input", { type: "password" })
				])
			]),
			m(Field, [
				m(Button, { em: EmLevel.Primary }, "提交")
			])
		]);
	}
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

	const validateForm = (user: User): Either<Array<string>, Output> =>
		validate("用户名", isNotEmpty(user.name))
			.param("", Right(Just(user.address)))
			.collect(mkOutput);

	const user = new FormData<User>({
		name: "",
		address: "一组默认地址！"
	});

	return {
		view: () => {
			const attr: FormAttr<User> = {
				formdata: user
			};

			const onsubmit = () => user.validate(validateForm)
				.ifRight(s => console.log(JSON.stringify(s, null, 4)));

			return m(Form, attr, [
				m(RequireField, [
					m("label", "用户名"),
					m("input", { onchange: e => user.putAt("name", e.target.value) })
				]),
				m(Field, [
					m("label", "地址"),
					m("input", { onchange: e => user.putAt("address", e.target.value) })
				]),
				m(Button, { connectClick: onsubmit, color: Color.Blue }, "提交")
			]);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.pink.segment", [
			m(Header, { size: Size.Huge, isDivid: true }, "表单"),
			Header2("表单外观"),
			m(FormS),

			m(Header, { size: Size.Large }, "表单基本验证"),
			m(ValidationS)
		])
	}
};

export default Main;
