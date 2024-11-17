import { applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

export const Documentation = (info: {
	summary: string;
	description: string;
	response: { description: string; type: any };
}) =>
	applyDecorators(
		ApiOperation({
			summary: info.summary,
			description: info.description,
		}),
		ApiOkResponse({
			description: info.response.description,
			type: info.response.type,
		}),
		ApiBadRequestResponse({
			description:
				"If any required params are missing or has invalid format or type.",
			type: ErrorDTO,
		}),
		ApiUnprocessableEntityResponse({
			description:
				"If was not possible process the request because of some wrong information.",
			type: ErrorDTO,
		}),
	);

class ErrorDTO {
	@ApiProperty({
		description: "The error name",
		example: "DomainError",
	})
	name: string;

	@ApiProperty({
		description: "The error message",
		example: "Title must be defined",
	})
	message: string;

	@ApiProperty({
		description: "The error http status",
		example: 422,
	})
	status: number;
}
