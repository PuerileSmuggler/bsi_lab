import {
    Association,

    DataTypes,
    Model,
    Optional
} from 'sequelize';
import { Password } from './Password';
import { User } from './User';

interface PasswordUsersAttributes {
  id: number;
  passwordId: number;
  ownerId: number;
  userId: number;
  key: string;
  passwords?: Array<Password>;
  user?: User;
  owner?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

type PasswordUsersCreationAttributes = Optional<PasswordUsersAttributes, 'id'>;

export class PasswordUsers
  extends Model<PasswordUsersAttributes, PasswordUsersCreationAttributes>
  implements PasswordUsersAttributes {
  public id!: number;
  public passwordId!: number;
  public ownerId!: number;
  public userId!: number;
  public key!: string;
  public readonly passwords!: Array<Password>;
  public readonly user?: User;
  public readonly owner?: User;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    users: Association<PasswordUsers, User>;
    passwords: Association<PasswordUsers, Password>;
  };

  public static associate(db) {
    PasswordUsers.hasOne(db.User, { foreignKey: 'id', sourceKey: 'userId', as: 'user' });
    PasswordUsers.hasOne(db.User, { foreignKey: 'id', sourceKey: 'ownerId', as: 'owner' });
    PasswordUsers.hasMany(db.Password, { foreignKey: 'id', sourceKey: 'passwordId' });
  }
}

export default function (sequelize): typeof PasswordUsers {
  PasswordUsers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      passwordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'password',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'passwordUsers',
    },
  );

  return PasswordUsers;
}
