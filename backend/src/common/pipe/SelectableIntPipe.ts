import {PipeTransform, BadRequestException, ArgumentMetadata} from '@nestjs/common';

export class SelectableIntPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata) {
        if (value === '' || value === undefined) {
            return '';
        }
        if (/^\d+$/.test(value)) {
            return parseInt(value, 10);
        }
        throw new BadRequestException(metadata.data + '可选或是数字');
    }
}
