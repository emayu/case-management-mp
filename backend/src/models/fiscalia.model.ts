import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface FiscaliaModel {
    id: string;
    nombre: string;
    ubicacion: string;
    descripcion?: string;
    activa: boolean;
    fecha_creacion: Date;
    usuario_creacion: string;
    fecha_modificacion: Date;
    usuario_modificacion: string;
};

interface FiscaliaCreacionModel extends Optional<FiscaliaModel, 'id'> { };

export class Fiscalia extends Model<FiscaliaModel, FiscaliaCreacionModel> implements FiscaliaModel {
    public id!: string;
    public nombre!: string;
    public ubicacion!: string;
    public descripcion?: string;
    public activa!: boolean;
    public fecha_creacion!: Date;
    public usuario_creacion!: string;
    public fecha_modificacion!: Date;
    public usuario_modificacion!: string;

}

Fiscalia.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    ubicacion: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    descripcion: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    activa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
        modelName: 'Fiscalia',
        tableName: 'fiscalias',
        timestamps: false,
    });