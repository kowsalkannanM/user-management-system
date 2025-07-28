import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/sequelize';

interface BookAttributes {
  id: number;
  title: string;
  genre?: string;
  published_date?: Date;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id' | 'genre' | 'published_date' | 'created_at' | 'updated_at'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public genre?: string;
  public published_date?: Date;
  public author_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    published_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'books',
    timestamps: false,
  }
);

export default Book;
