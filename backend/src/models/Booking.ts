import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Experience from './Experience';
import Slot from './Slot';

interface BookingAttributes {
  id: number;
  experienceId: number;
  slotId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPeople: number;
  totalPrice: number;
  promoCode?: string;
  discount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'promoCode' | 'discount' | 'status' | 'createdAt' | 'updatedAt'> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public experienceId!: number;
  public slotId!: number;
  public customerName!: string;
  public customerEmail!: string;
  public customerPhone!: string;
  public numberOfPeople!: number;
  public totalPrice!: number;
  public promoCode?: string;
  public discount!: number;
  public status!: 'pending' | 'confirmed' | 'cancelled';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
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
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'slots',
        key: 'id',
      },
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    promoCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
  }
);

// Associations
Experience.hasMany(Booking, { foreignKey: 'experienceId', as: 'bookings' });
Booking.belongsTo(Experience, { foreignKey: 'experienceId', as: 'experience' });

Slot.hasMany(Booking, { foreignKey: 'slotId', as: 'bookings' });
Booking.belongsTo(Slot, { foreignKey: 'slotId', as: 'slot' });

export default Booking;
