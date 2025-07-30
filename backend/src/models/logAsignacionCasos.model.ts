import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface LogAsignacionCasoModel {
    id: string;
    caso_id: string;
    fiscal_anterior_id: string;
    fiscal_nuevo_id: string;
    fecha: Date;
    motivo: string;
    usuario_intento: string;
    resultado: number;
    resultado_mensaje: string;
}

interface LogAsignacionCasoCreationModel extends Optional< LogAsignacionCasoModel, 'id'> {}


export class LogAsignacionCaso extends Model<LogAsignacionCasoModel, LogAsignacionCasoCreationModel> implements LogAsignacionCasoModel{
    public id!: string;
    public caso_id!: string;
    public fiscal_anterior_id!: string;
    public fiscal_nuevo_id!: string;
    public fecha!: Date;
    public motivo!: string;
    public usuario_intento!: string;
    public resultado!: number;
    public resultado_mensaje!: string;
    
}

LogAsignacionCaso.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    caso_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    fiscal_anterior_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    fiscal_nuevo_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario_intento: {
      type: DataTypes.UUID,
      allowNull: false
    },
    resultado: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    resultado_mensaje: {
      type: DataTypes.STRING,
      allowNull: false
    },
}, {
    sequelize,
    modelName: 'LogAsignaacionCaso',
    tableName: 'log_asignacion_casos',
    timestamps: false,
    createdAt: 'fecha'
})