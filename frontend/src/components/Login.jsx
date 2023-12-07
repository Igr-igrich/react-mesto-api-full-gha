import React from "react";

export default function Login({ onLogIn }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" name="registration">
      <h2 className="auth-form__title">Вход</h2>
      <input
        name="email"
        type="email"
        className="auth-form__input"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        placeholder="E-mail"
      />
      <input
        name="password"
        type="password"
        className="auth-form__input"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Пароль"
      />
      <button type="submit" className="auth-form__button">
        Войти
      </button>
    </form>
  );
}
