import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
class Address {
    @Field({ description: 'Street Name for the address' })
    @Prop()
    street: string;

    @Field({ description: 'City name for the address' })
    @Prop()
    city: string;

    @Field({ description: 'State name for the address' })
    @Prop()
    state: string;

    @Field({ description: 'Postal code for the address' })
    @Prop()
    postalCode: string;

    @Field({ description: 'Country name for the address' })
    @Prop()
    country: string;

    @Field({
        description:
            'To maintain whether the address is deleted or not (soft delete)',
    })
    @Prop()
    isDeleted: boolean;
}

export default Address;