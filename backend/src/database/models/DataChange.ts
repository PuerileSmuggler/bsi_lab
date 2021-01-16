import {
    Association,
    DataTypes,
    Model,
    Optional
} from 'sequelize';
import { Password } from './Password';
import { User } from './User';

interface DataChangeAttributes {
  id: number;
  userId: number;
  passwordId: number;
  fields: Array<string>;
  previousValues: Array<string>;
  currentValues: Array<string>;
  actionType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type DataChangeCreationAttributes = Optional<DataChangeAttributes, 'id'>;

export class DataChange
  extends Model<DataChangeAttributes, DataChangeCreationAttributes>
  implements DataChangeAttributes {
  public id!: number;
  public userId!: number;
  public passwordId!: number;
  public fields!: Array<string>;
  public previousValues!: Array<string>;
  public currentValues!: Array<string>;
  public actionType!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  

  public static associations: {
    users: Association<DataChange, User>;
    passwords: Association<DataChange, Password>;

  };

  public static associate(db) {
      DataChange.hasOne(db.Password, {
      foreignKey: 'id',
      sourceKey: 'passwordId',
    });
      DataChange.hasOne(db.User, {
      foreignKey: 'id',
      sourceKey: 'userId',
    });
  }
}

export default function (sequelize): typeof DataChange {
  DataChange.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      passwordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'password',
          key: 'id',
        },
      },
      actionType: {
          type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE'),
          allowNull: false
        },
        fields: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false
        },
        currentValues: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false
        },
        previousValues: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false
        },
    },
    {
      sequelize,
      modelName: 'dataChange',
    },
  );

  return DataChange;
}
