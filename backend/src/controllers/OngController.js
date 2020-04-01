const crypto = require('crypto');  //para encriptar e gerar a id da ong
const connection = require('../database/conection'); //coneccao com o banco de dados

module.exports = {
    async index(request, response) {   //metodo para a listagem dos dados da tabela
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);                                                                     
    },

    async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX'); 

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({ id });
    }
};