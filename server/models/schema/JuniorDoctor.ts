import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize'
import type { Message } from './Message'
type JuniorDoctorAssociations = 'juniorMessages'
export class JuniorDoctor extends Model<
  InferAttributes<JuniorDoctor, {omit: JuniorDoctorAssociations}>,
  InferCreationAttributes<JuniorDoctor, {omit: JuniorDoctorAssociations}>
> {
  declare id: CreationOptional<string>
  declare name: string | null
  declare email: string | null
  declare password: string | null
  declare licenseNumber: string | null
  declare phoneNumber: string | null
  declare address: string | null
  declare gender: 'Male' | 'Female' | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  // JuniorDoctor hasMany Message (as JuniorMessages)
  declare juniorMessages?: NonAttribute<Message[]>
  declare getJuniorMessages: HasManyGetAssociationsMixin<Message>
  declare setJuniorMessages: HasManySetAssociationsMixin<Message, number>
  declare addJuniorMessage: HasManyAddAssociationMixin<Message, number>
  declare addJuniorMessages: HasManyAddAssociationsMixin<Message, number>
  declare createJuniorMessage: HasManyCreateAssociationMixin<Message>
  declare removeJuniorMessage: HasManyRemoveAssociationMixin<Message, number>
  declare removeJuniorMessages: HasManyRemoveAssociationsMixin<Message, number>
  declare hasJuniorMessage: HasManyHasAssociationMixin<Message, number>
  declare hasJuniorMessages: HasManyHasAssociationsMixin<Message, number>
  declare countJuniorMessages: HasManyCountAssociationsMixin
  declare static associations: {
    juniorMessages: Association<JuniorDoctor, Message>
  }
  static initModel(sequelize: Sequelize): typeof JuniorDoctor {
    JuniorDoctor.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      licenseNumber: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female')
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })
    return JuniorDoctor
  }
}