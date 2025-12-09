import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { LogIn, UserPlus } from "lucide-react";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // Login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      navigate(redirect);
    } catch (error) {
      console.error("Erro no login", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone,
      });
      navigate(redirect);
    } catch (error) {
      console.error("Erro no cadastro", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Entrar" : "Criar Conta"}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? "Entre com suas credenciais"
                : "Preencha seus dados para se cadastrar"}
            </p>
          </div>

          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg transition ${
                isLogin
                  ? "bg-white shadow-sm font-semibold text-primary-600"
                  : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg transition ${
                !isLogin
                  ? "bg-white shadow-sm font-semibold text-primary-600"
                  : "text-gray-600"
              }`}
            >
              Cadastro
            </button>
          </div>

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="E-mail"
                type="email"
                required
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                placeholder="seu@email.com"
              />
              <Input
                label="Senha"
                type="password"
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="••••••••"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={LogIn}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label="Nome Completo"
                type="text"
                required
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                placeholder="Seu nome"
              />
              <Input
                label="E-mail"
                type="email"
                required
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                placeholder="seu@email.com"
              />
              <Input
                label="Telefone (opcional)"
                type="tel"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phone: e.target.value })
                }
                placeholder="(11) 99999-9999"
              />
              <Input
                label="Senha"
                type="password"
                required
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                placeholder="••••••••"
              />
              <Input
                label="Confirmar Senha"
                type="password"
                required
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={UserPlus}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Cadastrando..." : "Criar Conta"}
              </Button>
            </form>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo:</strong> Use qualquer e-mail e senha para testar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
