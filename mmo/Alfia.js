module.exports = (sequelize, DataTypes) => {
    const Alfia = sequelize.define(
        "Alfia",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nameAlfia: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slugAlfia: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
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
        tableName: "alfia",
    }
    );
    
    return Alfia;
}
