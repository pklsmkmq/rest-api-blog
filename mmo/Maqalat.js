module.exports = (sequelize, DataTypes) => {
    const Maqalat = sequelize.define(
        "Maqalat",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            titleMaqalat: {
                type: DataTypes.STRING,
                allowNull: false
            },
            imageMaqalat: {
                type: DataTypes.STRING,
                allowNull: false
            },
            activeMaqalat: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            featuredMaqalat: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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
        tableName: "maqalat",
    }
    );
    return Maqalat;
}
