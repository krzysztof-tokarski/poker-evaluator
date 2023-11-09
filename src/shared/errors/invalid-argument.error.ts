export class InvalidArgumentError extends Error {
	constructor(message: string, argument: string) {
		super(`${message} Invalid argument: ${argument}`);
		this.name = InvalidArgumentError.name;
	}
}
