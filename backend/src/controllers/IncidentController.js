const connection = require('../database/conection'); //coneccao com o banco de dados

module.exports = {
    async index(request, response) { // metodo para a listagem de todos os casos
        const { page = 1 } = request.query; //busca a pagina 1 esquema de paginação

        const [count] = await connection('incidents').count();  // variavel para a contague de casos total

        const incidents = await connection('incidents') // paginacao
            .join('ongs', 'ongs.id', 'incidents.ong_id')  // para relacionar dados de duas tabelas
            .limit(5)   // 5 registro por pagina
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']);// todos os incidentes porem os dados da ong separdos

        response.header('x-Total-Count', count['count(*)']); // cabecalho na resposta
        return response.json(incidents);
    },

    async create(request, response) {   //metodo para a criaçao dos casos
        const { title, description, value } = request.body;
		const ong_id = request.headers.authorization;  //dados do cabeçalho no frontend, o contesto da requisiaçao
      
    const [id] = await connection('incidents').insert({ // o primeiro elemento do array é guardado na variavel id
	    title,
		description, 
		value,
		ong_id,
    });

    return response.json({ id });
    },

    async delete(request, response) { // metodo para deletar incidets
        const { id } = request.params;    // pega o id do caso dentro do request.params
        const ong_id = request.headers.authorization; // tambem busca o id da ong logada
        
        const incident = await connection('incidents') // verificar se e a mesma do caso
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id != ong_id) { // verifica o id da ong
            return response.status(401).json({ error: 'Operetion not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // resposta de secesso sem conteudo
    }
};