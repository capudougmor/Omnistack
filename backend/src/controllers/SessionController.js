const connection = require('../database/conection'); //coneccao com o banco de dados

module.exports = {
    async create(request, response) {
        const { id } = request.body;  // busca o id da ong no corpo da requisicao

        const ong = await connection('ongs') // compara o id das ongs
            .where('id', id)
            .select('name')   // informacao que retornara para o front end
            .first();   // para retornar um unico nane

        if(!ong) {// se a ong nao existir
            return response.status(400).json({ error: 'No ONG found with this ID'});   // algo deu errado
        }

        return response.json(ong);
    }
}
