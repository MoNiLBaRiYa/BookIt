import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ExperienceAttributes {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExperienceCreationAttributes extends Optional<ExperienceAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Experience extends Model<ExperienceAttributes, ExperienceCreationAttributes> implements ExperienceAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public location!: string;
  public price!: number;
  public duration!: string;
  public category!: string;
  public imageUrl!: string;
  public rating!: number;
  public reviewCount!: number;
  public highlights!: string[];
  public included!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Experience.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 0,
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    highlights: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    included: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: 'experiences',
    timestamps: true,
  }
);

export default Experience;
