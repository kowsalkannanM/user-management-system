import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/sequelize';

interface AuthorAttributes {
  id: number;
  name: string;
  bio?: string;
  created_at: Date;
  updated_at: Date;
}

interface AuthorCreationAttributes extends Optional<AuthorAttributes, 'id' | 'bio' | 'created_at' | 'updated_at'> {}

class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
  public id!: number;
  public name!: string;
  public bio?: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'authors',
    timestamps: false,
  }
);

export default Author;
