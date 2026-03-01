'use client';
import { useState } from "react";
import { CloseEyeTwo, DeleteSvg, DotsTwoSvg, DraftSvg, DuplicateSvg } from "@/components/svg";
import useClickOutside from "@/hooks/use-click-outside";


export default function CourseDashboardItemAction({courseId}:{courseId:number}) {
    const [openActionId, setOpenActionId] = useState<number | null>(null);
    const actionButtonRef = useClickOutside(setOpenActionId);

    function toggleAction(id: number) {
        if (openActionId === id) {
           setOpenActionId(null);
        } else {
           setOpenActionId(id);
        }
     }

    return (
        <div ref={actionButtonRef} className={`tpd-action-inexact-btn ${openActionId === courseId ? 'active' : ''}`}>
            <button className="click" onClick={() => toggleAction(courseId)}>
                <DotsTwoSvg />
            </button>
            <div className="tpd-action-click-tooltip">
                <button>
                    <span>
                        <DuplicateSvg />
                    </span>
                    Duplicar
                </button>
                <button>
                    <span>
                        <DraftSvg />
                    </span>
                    Mover para Rascunho
                </button>
                <button>
                    <span>
                        <DeleteSvg />
                    </span>
                    Excluir
                </button>
            </div>
        </div>
    )
}