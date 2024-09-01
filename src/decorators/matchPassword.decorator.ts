/* eslint-disable prettier/prettier */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'MatchPassword',
  async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
  // Comparar password con confirmación de password
  validate(
    password: any,
    args: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
    // Implementación de la validación aquí
  }

  //? si validator falla

  defaultMessage(args: ValidationArguments): string {
    return 'Las contraseñas no coinciden';
  }
}
