import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface UsuarioModel {
    id: string;
    nombre: string;
    correo: string;
    rol: string;
    fecha_creacion: Date;
    usuario_creacion: string;
    fecha_modificacion: Date;
    usuario_modificacion: string;
    activo: boolean;
    fiscalia_id?: string;
    contrasena: string;
};

interface UsuarioCreacionModel extends Optional<UsuarioModel, 'id'> {};

export class Usuario extends Model<UsuarioModel, UsuarioCreacionModel> implements UsuarioModel{
      public id!: string;
      public nombre!: string;
      public correo!: string;
      public rol!: string;
      public fecha_creacion!: Date;
      public usuario_creacion!: string;
      public fecha_modificacion!: Date;
      public usuario_modificacion!: string;
      public activo!: boolean;
      public fiscalia_id?: string;
      public contrasena!: string;
    
}

Usuario.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  rol: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  usuario_creacion: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  fecha_modificacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  usuario_modificacion: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  fiscalia_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: false,
});
