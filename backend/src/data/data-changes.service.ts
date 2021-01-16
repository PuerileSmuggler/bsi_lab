import {
  Injectable
} from '@nestjs/common';
import { DataChangeDTO } from 'src/dto/DataChange';
import {
  UserCredentials
} from 'src/dto/User';
import { PasswordService } from 'src/password/password.service';
import db from '../database/initializeDatabase';

@Injectable()
export class DataChangesService {
  constructor(private readonly passwordService: PasswordService) {}
  
  async getDataChanges(user: UserCredentials) {
    return await db.DataChange.findAll({
      where: {
        userId: user.id
      },
      order: [
        [ 'createdAt', 'DESC' ]
      ]
    });
  }

  async revertDataChange(user: UserCredentials, dataChange: DataChangeDTO) {
    const { actionType, fields, currentValues, previousValues, passwordId, userId } = dataChange;
    switch(actionType) {
      case ('DELETE'): {
        await (await db.Password.findByPk(dataChange.passwordId)).update({
          removed: false
        });
        await db.DataChange.create({
      actionType: 'CREATE',
      passwordId,
      userId,
      fields,
      currentValues,
      previousValues,
    });
        break;
      }
      case ('CREATE'): {
        await this.passwordService.deletePassword(user, passwordId);
        break;
      }
      case ('UPDATE'): {
        const update = {};
        fields.forEach((field, index) => {
          update[field] = previousValues[index];
        });
        await db.Password.update(update, {
          where: {
            id: dataChange.passwordId
          }
        });
        const { id, createdAt, updatedAt, ...rest } = dataChange;
        await db.DataChange.create({ ...rest, currentValues: rest.previousValues, previousValues: rest.currentValues });
        break;
      }
    }
  }
}
