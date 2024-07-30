import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsMatchPassword(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isMatchPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return value === relatedValue
        }
      }
    })
  }
}
