import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface CasoModel {
  id: string;
  numero_caso: string;
  nombre: string;
  descripcion: string;
  estado: string;
  usuario_asignado_id?: string;
  fiscalia_id: string;
  fecha_creacion: Date;
  usuario_creacion: string;
  fecha_modificacion: Date;
  usuario_modificacion: string;
}

interface CasoCreationModel extends Optional<CasoModel, 'id'|'usuario_asignado_id'> {}


export class Caso extends Model<CasoModel, CasoCreationModel> implements CasoModel {
  public id!: string;
  public numero_caso!: string;
  public nombre!: string;
  public descripcion!: string;
  public estado!: string;
  public usuario_asignado_id?: string;
  public fiscalia_id!: string;
  public fecha_creacion!: Date;
  public usuario_creacion!: string;
  public fecha_modificacion!: Date;
  public usuario_modificacion!: string;
}


Caso.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    numero_caso: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    usuario_asignado_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    fiscalia_id: {
      type: DataTypes.UUID,
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
  },
  {
    sequelize,
    modelName: 'Caso',
    tableName: 'casos',
    timestamps: false,
  })