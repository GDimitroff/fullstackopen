const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'created_at', {
      type: DataTypes.DATE,
      allowNull: true,
    })

    await queryInterface.addColumn('blogs', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: true,
    })

    await queryInterface.sequelize.query(`
      UPDATE blogs
      SET created_at = NOW()
      WHERE created_at IS NULL;
    `)

    await queryInterface.sequelize.query(`
      UPDATE blogs
      SET updated_at = NOW()
      WHERE updated_at IS NULL;
    `)

    await queryInterface.changeColumn('blogs', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
    })

    await queryInterface.changeColumn('blogs', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'created_at')
    await queryInterface.removeColumn('blogs', 'updated_at')
  },
}
