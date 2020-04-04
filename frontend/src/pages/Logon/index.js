import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom'; // useHistory para mudar as rotas
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory(); // variavel com o history

    async function handleLogin(e) { // validar se a ong existe
      e.preventDefault();  // usado em todos os formularios para evitar o redirect
      
      try {
        const response = await api.post('sessions', { id }); // para que os datos fiquem todos disponiveis na app salva se no storage

        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);

        history.push('/profile'); // se tudo der certo é enviado para o profile
      } catch (err) {
        alert('Falha no login, tente novamente.');
      }
    };

    return (
      <div className="logon-container">
          <section className="form">
            <img src={ logoImg } alt="Be The Hero"/>

            <form onSubmit={handleLogin}> 
                <h1>Faça seu logon</h1>

                <input 
                  placeholder="Sua ID"
                  value={id}
                  onChange={e => setId(e.target.value)} //valor da campo
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#e02041"/>
                    Não tenho cadastro
                </Link>
            </form>
          </section>

          <img src={ heroesImg } alt="Heroes"/>
      </div>
      
    );
}