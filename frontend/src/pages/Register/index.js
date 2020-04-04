import React, { useState } from 'react'; // importar o estado para as variaveis
import { Link, useHistory } from 'react-router-dom'; // useHistory para enviar o usuari de volta
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {// stados para cada campo do formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {  //funcao para o cadastro do usuario disparada quando o form de um submit
    e.preventDefault();  // previne um evento padrao no carregamento da pagina

    const data = { // objeto com os eventos
      name, 
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);// envia os dados e recebe a resposta o envio 'e' sempre que se usar o await usa-se o async antes da funçao
      // o await é para aguardar a resposta
      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');  // envia de volta para o logon
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }     
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}> 
          <input 
            placeholder="Nome da ONG"
            value={name} // valor do input
            onChange={e => setName(e.target.value)}// ouve o valor e armazena no estado name
          />
          <input type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatapp(e.target.value)}          
          />

          <div className="input-group">
          <input placeholder="Cidade" 
            value={city}
            onChange={e => setCity(e.target.value)}          
          />
          <input placeholder="UF" 
            style={{ width: 80}}
            value={uf}
            onChange={e => setUf(e.target.value)}
          />
          </div>

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}