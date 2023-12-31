import React, { Component } from 'react';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import '../CSS/loginPage.css';
import getToken from '../0-Services/tokenAPI';
import LoadingPage from '../Components/LoadingPage';
import logo from '../trivia.png';
import actions from '../3-actions';

const mapDispatchToProps = (dispatch) => ({
  setName: (name) => dispatch(actions.setName(name)),
  setEmail: (gravatarEmail) => dispatch(actions.setEmail(gravatarEmail)),
  setInitialState: () => dispatch(actions.setInitialState()),
});

class Login extends Component {
  state =
    {
      name: '',
      // assertions: '',
      // score: '',
      gravatarEmail: '',
      loading: false,
    }

  componentDidMount() {
    const { setInitialState } = this.props;
    setInitialState();
  }

    handleChange = ({ target }) => {
      const { value } = target;

      this.setState({
        [target.name]: value,
      });
    }

    handleClick = () => {
      const { history, setName, setEmail } = this.props;
      const { name, gravatarEmail } = this.state;
      setName(name);
      setEmail(gravatarEmail);
      this.setState({ loading: true }, async () => {
        localStorage.setItem('token', await getToken());
        this.setState({ loading: false }, () => {
          history.push('/game');
        });
      });
    }

    render() {
      const { name, gravatarEmail, loading } = this.state;
      if (loading) {
        return <LoadingPage />;
      }
      return (
        <div className="App loginPage">
          <section className="App-header loginPage-container">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
            <form className="login-form">
              <label htmlFor="player-name">
                Nome
                <input
                  id="player-name"
                  data-testid="input-player-name"
                  type="text"
                  name="name"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="player-email">
                Email
                <input
                  id="player-email"
                  data-testid="input-gravatar-email"
                  type="email"
                  name="gravatarEmail"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="btn-play"
                disabled={ (name === '' || gravatarEmail === '') }
                onClick={ this.handleClick }
                className="play-btn"
              >
                Play

              </button>
              {/* <Link to="/Settings">
                <button
                  type="button"
                  data-testid="btn-settings"
                >
                  Settings
                </button>
              </Link> */}

            </form>
          </section>
        </div>
      );
    }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  setName: propTypes.func.isRequired,
  setEmail: propTypes.func.isRequired,
  setInitialState: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
