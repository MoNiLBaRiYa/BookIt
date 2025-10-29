import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Experience from './Experience';

interface SlotAttributes {
  id: number;
  experienceId: number;
  date: Date;
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SlotCreationAttributes extends Optional<SlotAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Slot extends Model<SlotAttributes, SlotCreationAttributes> implements SlotAttributes {
  public id!: number;
  public experienceId!: number;
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
  public availableSpots!: number;
  public totalSpots!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Slot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    experienceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'experiences',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availableSpots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSpots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'slots',
    timestamps: true,
  }
);

// Associations
Experience.hasMany(Slot, { foreignKey: 'experienceId', as: 'slots' });
Slot.belongsTo(Experience, { foreignKey: 'experienceId', as: 'experience' });

export default Slot;
