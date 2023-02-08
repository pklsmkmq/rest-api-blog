module.exports = (sequelize, DataTypes) => {
    const Taeliq = sequelize.define(
        "Taeliq",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nameTaeliq: {
                type: DataTypes.STRING,
                allowNull: false
            },
            emailTaeliq: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            taeliq: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
        tableName: "taeliq",
    }
    );
    return Taeliq;
}
