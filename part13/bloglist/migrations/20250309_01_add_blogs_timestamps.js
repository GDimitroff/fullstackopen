const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    // Step 1: Add the columns allowing nulls
    await queryInterface.addColumn('blogs', 'created_at', {
      type: DataTypes.DATE,
      allowNull: true,
    })

    await queryInterface.addColumn('blogs', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: true,
    })

    // Step 2: Set values for existing rows
    await queryInterface.sequelize.query(`
      UPDATE blogs
      SET created_at = NOW(), updated_at = NOW()
    `)

    // Step 3: Change the columns to NOT NULL
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
