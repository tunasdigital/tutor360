'use client';
import { useState } from "react";
import { DeleteSvg, DotsTwoSvg, DraftSvg, DuplicateSvg } from "@/components/svg";
import useClickOutside from "@/hooks/use-click-outside";
import { useRouter } from "next/navigation";

export default function CourseDashboardItemAction({courseId}:{courseId:string | number}) {
    const [openActionId, setOpenActionId] = useState<number | string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const actionButtonRef = useClickOutside(setOpenActionId);
    const router = useRouter();

    function toggleAction(id: number | string) {
        if (openActionId === id) {
           setOpenActionId(null);
        } else {
           setOpenActionId(id);
        }
    }

    // 🚀 A MANOBRA DE EXCLUSÃO: Conversa com a API e limpa o banco
    async function handleDeleteCourse() {
        if (confirm("Você tem certeza que deseja excluir permanentemente este curso?")) {
            setIsDeleting(true);
            try {
                const response = await fetch(`/api/course/delete?id=${courseId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert("Curso removido com sucesso!");
                    setOpenActionId(null);
                    router.refresh(); // 🔄 Atualiza a lista para o curso sumir da tela
                } else {
                    const errorData = await response.json();
                    alert(`Erro: ${errorData.error || 'Não foi possível excluir o curso.'}`);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert("Erro crítico ao tentar conectar com o servidor.");
            } finally {
                setIsDeleting(false);
            }
        }
    }

    return (
        <div ref={actionButtonRef} className={`tpd-action-inexact-btn ${openActionId === courseId ? 'active' : ''}`}>
            <button className="click" onClick={() => toggleAction(courseId)} disabled={isDeleting}>
                <DotsTwoSvg />
            </button>
            <div className="tpd-action-click-tooltip">
                <button type="button" onClick={() => alert("Função em desenvolvimento")}>
                    <span><DuplicateSvg /></span> Duplicar
                </button>
                <button type="button" onClick={() => alert("Função em desenvolvimento")}>
                    <span><DraftSvg /></span> Mover para Rascunho
                </button>
                
                {/* 🎯 O GATILHO REAL: Agora este botão aciona a limpeza do banco */}
                <button 
                    type="button" 
                    onClick={handleDeleteCourse} 
                    style={{ color: isDeleting ? '#ccc' : '#ff4d4d' }}
                    disabled={isDeleting}
                >
                    <span><DeleteSvg /></span> 
                    {isDeleting ? 'Excluindo...' : 'Excluir'}
                </button>
            </div>
        </div>
    )
}