import { ReflectMetadata } from '@nestjs/common';

export const PropertyFilter = (...props: string[]) =>
	ReflectMetadata('propertyFilter', props);
