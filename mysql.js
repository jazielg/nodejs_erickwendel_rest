const Sequelize = require('sequelize')

class Mysql {

	constructor() {
		this._driver = null
		this._dados = null
		this.connect()
	}

	async connect() {
		this._driver = new Sequelize('nodejs', 'root', '123456', {
		  	dialect: 'mysql',
		  	host: 'localhost'
		})
		await this.defineModel()
	}

	async defineModel() {
		this._dados = this._driver.define('dados' , {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false
			},
			idade: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, {
			tableName: 'dados'
		})

		await this._dados.sync()
	}

	async index() {
		return this._dados.findAll({raw: true})
	}

	async show(item = {}) {
		return this._dados.findAll({where: item, raw: true})
	}

	async store(item) {
		const { dataValues } = await this._dados.create(item)
		return dataValues
	}

	async isConnected() {
		try {
			await this._driver.authenticate()
			return true
		} catch(error) {
			console.log('Fail!', error)
			return false
		}
	}
}

module.exports = Mysql