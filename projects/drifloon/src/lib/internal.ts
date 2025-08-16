export class CssStyleBuilder {
	private css: Partial<CSSStyleDeclaration> = {};

	set<K extends keyof CSSStyleDeclaration>(
		key: K,
		value: CSSStyleDeclaration[K]
	): this {
		this.css[key] = value;
		return this;
	}

	setOptional<K extends keyof CSSStyleDeclaration>(
		key: K,
		value: CSSStyleDeclaration[K] | null | undefined
	): this {
		if (value === null || value === undefined) {
			return this;
		}

		return this.set(key, value);
	}

	build(): Partial<CSSStyleDeclaration> {
		return this.css;
	}
}
