'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

type IProps = {
    content: string;
    onChange: (html: string) => void;
    fieldName: string;
};

export default function TutorRichEditor({ content, onChange, fieldName }: IProps) {
    const editor = useEditor({
        // A-1: 🛡️ A Cerca de Segurança contra erros de SSR/Hydration
        immediatelyRender: false, 
        extensions: [
            StarterKit,
            Image.configure({
                allowBase64: true,
                HTMLAttributes: { class: 'img-fluid rounded my-3' },
            }),
            Placeholder.configure({
                placeholder: 'Escreva o conteúdo da aula ou cole imagens aqui...',
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'form-control prose prose-sm max-w-none min-h-[150px] focus:outline-none py-3',
            },
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div className="tutor-editor-wrapper border rounded">
            <div className="editor-toolbar p-2 border-bottom bg-light d-flex gap-2 flex-wrap">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`btn btn-sm ${editor.isActive('bold') ? 'btn-primary' : 'btn-outline-secondary'}`}><b>B</b></button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`btn btn-sm ${editor.isActive('italic') ? 'btn-primary' : 'btn-outline-secondary'}`}><i>I</i></button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`btn btn-sm ${editor.isActive('bulletList') ? 'btn-primary' : 'btn-outline-secondary'}`}><i className="fa-solid fa-list-ul"></i></button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`btn btn-sm ${editor.isActive('orderedList') ? 'btn-primary' : 'btn-outline-secondary'}`}><i className="fa-solid fa-list-ol"></i></button>
            </div>
            
            <EditorContent editor={editor} />
            <input type="hidden" name={fieldName} value={editor.getHTML()} />
        </div>
    );
}