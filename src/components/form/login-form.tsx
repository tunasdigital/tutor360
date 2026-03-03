'use client';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CloseEye, GoogleSvg, OpenEye } from '../svg';
import ErrMsg from "../err-msg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setLoginError("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else if (res?.ok) {
        // 🎯 SUCESSO: Rota corrigida! Agora te joga exatamente no Painel de Comando
        router.push("/dashboard/admin-dashboard");
        router.refresh(); 
      }
    } catch (error) {
      setLoginError("Erro ao tentar conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="tp-login-input-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="tp-login-input p-relative">
            <label>E-mail de Acesso</label>
            <input 
                type="email" 
                placeholder="Digite seu e-mail corporativo" 
                {...register("email", { required: "O e-mail é obrigatório" })} 
                name="email" 
            />
            {errors.email?.message && <ErrMsg msg={errors.email.message} />}
          </div>
        </div>
        <div className="col-12">
          <div className="tp-login-input p-relative">
            <label>Senha Segura</label>
            <div className="password-input p-relative">
              <input 
                type={showPass ? "text" : "password"} 
                placeholder="Sua senha secreta" 
                {...register("password", { 
                    required: "A senha é obrigatória", 
                    minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" } 
                })} 
                name="password" 
              />
              <div className="tp-login-input-eye password-show-toggle">
                <span className={`${showPass ? "open-eye open-eye-icon" : "open-close close-eye-icon"}`} onClick={() => setShowPass(!showPass)}>
                  {showPass ? <OpenEye /> : <CloseEye />}
                </span>
              </div>
            </div>
            {errors.password?.message && <ErrMsg msg={errors.password.message} />}
          </div>
        </div>
        <div className="col-12">
          <div className="tp-login-from-remeber">
            <div className="row">
              <div className="col-6">
                <div className="tp-contact-input-remeber login">
                  <input id="remember" type="checkbox" {...register("remember", { required: false })} />
                  <label htmlFor="remember">Lembrar de mim</label>
                </div>
              </div>
              <div className="col-6">
                <div className="tp-login-input-remeber text-end">
                  <a href="#">Esqueceu a senha?</a>
                </div>
              </div>
            </div>
          </div>
          
          {loginError && (
              <div style={{ marginBottom: '15px', color: '#ff4d4d', fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>
                  {loginError}
              </div>
          )}

          <div className="tp-login-from-btn">
            <button type='submit' className="tp-btn-inner w-100 text-center" disabled={isLoading}>
                {isLoading ? "Autenticando..." : "Entrar no Sistema"}
            </button>
          </div>
          <div className="tp-login-from-subtitle-heading">
            <h5 className="tp-login-from-subtitle">Alternativas de Acesso</h5>
          </div>
          <div className="tp-login-from-google-btn">
            <a className="w-100" href="#" onClick={(e) => { e.preventDefault(); alert("Integração Google em breve!"); }}>
              <GoogleSvg />
              Continuar com o Google
            </a>
          </div>
        </div>
      </div>
    </form>
  )
}