export abstract class ValueObject {
	constructor(private readonly props) {
		this.validate(props);
	}

	get value() {
		return this.props;
	}

	abstract validate(props);
}
