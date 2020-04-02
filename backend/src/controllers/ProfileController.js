const connection = require('../database/conection'); //coneccao com o banco de dados

module.exports = {
    async index(request, response) { //retorna os dados especificos de uma unica ong
    const ong_id = request.headers.authorization;
    
    const incidents = await connection('incidents')  //busca os incidents desta ong
            .where('ong_id', ong_id)
            .select('*');   //seleciona todos os campos
        
    return response.json(incidents);
    }
}
