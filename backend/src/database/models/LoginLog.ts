import { DataTypes, Model, Optional } from 'sequelize';

interface LoginLogAttributes {
  id: number;
  login: string;
  ip: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type LoginLogCreationAttributes = Optional<LoginLogAttributes, 'id'>;

export class LoginLog
  extends Model<LoginLogAttributes, LoginLogCreationAttributes>
  implements LoginLogAttributes {
  public id!: number;
  public login!: string;
  public ip!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {}
}

export default function (sequelize): typeof LoginLog {
  LoginLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'loginlog',
    },
  );

  return LoginLog;
}
