export default function InstructorSettingPassword() {
    return (
        <div className="tpd-course-area">
            <div className="tpd-setting-box">
                <div className="tpd-setting-password-content">
                    <div className="col-lg-8">
                        <div className="tpd-input">
                            <label>Senha Atual</label>
                            <input type="password" placeholder="Digite sua senha atual" />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="tpd-input">
                            <label>Nova Senha</label>
                            <input type="password" placeholder="Digite a nova senha" />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="tpd-input">
                            <label>Confirmar Nova Senha</label>
                            <input type="password" placeholder="Repita a nova senha" />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="tpd-input">
                            <div className="tpd-setting-btn">
                                <button type="submit">Definir Nova Senha</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}