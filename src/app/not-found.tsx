import { Metadata } from "next";
import Image from "next/image";
import error_img from '@/assets/img/error/error.png';
import Link from "next/link";
import HeaderTwo from "@/components/header/header-two";
import FooterSeven from "@/components/footer/footer-seven";


export const metadata: Metadata = {
    title: "Página não encontrada - Tutor360",
};

export default function NotFound() {
    return (
        <>
            {/* header area start */}
            <HeaderTwo inner={true} />
            {/* header area end */}
            <main>

                {/* not found area start */}
                <div className="tp-error-area pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="tp-error-wrapper text-center">
                                    <h4 className="tp-error-title">Ops!</h4>
                                    <div className="tp-error-thumb mb-50">
                                        <Image src={error_img} alt="Imagem de erro" style={{ height: "auto" }} />
                                    </div>
                                    <div className="tp-error-content">
                                        <h4 className="tp-error-title-sm">Algo deu errado...</h4>
                                        <p>Desculpe, não conseguimos encontrar esta página.</p>
                                        <Link className="tp-btn-inner" href="/">Voltar para o Início</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* not found area end */}
            </main>

            {/* footer area start */}
            <FooterSeven />
            {/* footer area end */}
        </>
    );
}