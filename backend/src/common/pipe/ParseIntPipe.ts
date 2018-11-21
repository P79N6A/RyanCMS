import {PipeTransform, BadRequestException, ArgumentMetadata} from '@nestjs/common';

export class ParseIntPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata) {
        if (value === undefined) {
            throw new BadRequestException('缺少参数' + metadata.data);
        }
        if (/^\d+$/.test(value)) {
            return parseInt(value, 10);
        }
        throw new BadRequestException(metadata.data + '必须是数字');
    }
}
