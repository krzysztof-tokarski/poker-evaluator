export class UnexpectedEnumValue extends Error {
	constructor(enumType: string, invalidValue: string) {
		super(
			`Provided value did not match variables defined by ${enumType}.  Invalid value: ${invalidValue}`,
		);
		this.name = UnexpectedEnumValue.name;
	}
}
