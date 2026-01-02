'use client';

import { useState } from 'react';

interface Program {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    order: number;
}

interface ProgramsManagerProps {
    programs: Program[];
    onSave: (programs: Program[]) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, program: Program, setProgram: (p: Program) => void) => void;
}

export default function ProgramsManager({ programs, onSave, onImageUpload }: ProgramsManagerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentProgram, setCurrentProgram] = useState<Program | null>(null);

    const handleCreateNew = () => {
        setCurrentProgram({
            id: Date.now().toString(),
            title: '',
            description: '',
            imageUrl: '',
            order: programs.length + 1,
        });
        setIsEditing(true);
    };

    const handleEdit = (program: Program) => {
        setCurrentProgram(program);
        setIsEditing(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Вы уверены, что хотите удалить эту программу?')) {
            const newPrograms = programs.filter(p => p.id !== id);
            onSave(newPrograms);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentProgram) return;

        const existingIndex = programs.findIndex(p => p.id === currentProgram.id);
        let newPrograms;

        if (existingIndex >= 0) {
            newPrograms = [...programs];
            newPrograms[existingIndex] = currentProgram;
        } else {
            newPrograms = [...programs, currentProgram];
        }

        // Sort by order
        newPrograms.sort((a, b) => a.order - b.order);

        onSave(newPrograms);
        setIsEditing(false);
        setCurrentProgram(null);
    };

    if (isEditing && currentProgram) {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-md)', borderBottom: '2px solid var(--color-border)' }}>
                    <h2 style={{ margin: 0 }}>{currentProgram.id && programs.find(p => p.id === currentProgram.id) ? 'Редактировать программу' : 'Создать новую программу'}</h2>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setCurrentProgram(null);
                        }}
                        className="btn btn-primary"
                    >
                        ← Назад к списку
                    </button>
                </div>

                <form onSubmit={handleSave} style={{ background: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Заголовок программы *</label>
                        <input
                            type="text"
                            value={currentProgram.title}
                            onChange={(e) => setCurrentProgram({ ...currentProgram, title: e.target.value })}
                            required
                            placeholder="Например: Relaxium"
                            style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Порядок отображения *</label>
                        <input
                            type="number"
                            value={currentProgram.order}
                            onChange={(e) => setCurrentProgram({ ...currentProgram, order: parseInt(e.target.value) || 1 })}
                            required
                            min="1"
                            placeholder="1"
                            style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem' }}
                        />
                        <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                            Программы будут отображаться в порядке возрастания этого числа
                        </small>
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Описание программы *</label>
                        <textarea
                            value={currentProgram.description}
                            onChange={(e) => setCurrentProgram({ ...currentProgram, description: e.target.value })}
                            required
                            rows={8}
                            placeholder="Подробное описание программы (поддерживается HTML)"
                            style={{ width: '100%', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                        />
                        <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                            Можно использовать HTML теги: &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;
                        </small>
                    </div>

                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>Изображение программы</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onImageUpload(e, currentProgram, setCurrentProgram)}
                            style={{ width: '100%', padding: 'var(--spacing-sm)', border: '2px solid var(--color-border)', borderRadius: 'var(--border-radius)' }}
                        />
                        <small style={{ display: 'block', marginTop: 'var(--spacing-xs)', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                            Изображения автоматически сжимаются для экономии места
                        </small>
                        {currentProgram.imageUrl && (
                            <div style={{ marginTop: 'var(--spacing-md)' }}>
                                <img src={currentProgram.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--border-radius)', display: 'block' }} />
                                <button
                                    type="button"
                                    onClick={() => setCurrentProgram({ ...currentProgram, imageUrl: '' })}
                                    style={{ marginTop: 'var(--spacing-sm)', padding: 'var(--spacing-xs) var(--spacing-md)', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 'var(--border-radius)', cursor: 'pointer' }}
                                >
                                    Удалить изображение
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                        <button type="submit" className="btn btn-primary">
                            Сохранить программу
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setCurrentProgram(null);
                            }}
                            className="btn"
                            style={{ background: '#ccc' }}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-md)', borderBottom: '2px solid var(--color-border)' }}>
                <h2 style={{ margin: 0 }}>Управление программами</h2>
                <button onClick={handleCreateNew} className="btn btn-accent">
                    + Создать программу
                </button>
            </div>

            {programs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', background: 'var(--color-background-alt)', borderRadius: 'var(--border-radius)' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>Программ пока нет. Создайте первую!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    {programs.sort((a, b) => a.order - b.order).map((program) => (
                        <div key={program.id} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: 'var(--spacing-md)', display: 'grid', gridTemplateColumns: program.imageUrl ? 'auto 1fr auto' : '1fr auto', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                            {program.imageUrl && (
                                <div style={{ width: '100px', height: '100px', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                                    <img src={program.imageUrl} alt={program.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            )}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
                                    <span style={{ background: 'var(--color-primary)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>#{program.order}</span>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{program.title}</h3>
                                </div>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }} dangerouslySetInnerHTML={{ __html: program.description.substring(0, 150) + (program.description.length > 150 ? '...' : '') }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                                <button
                                    onClick={() => handleEdit(program)}
                                    className="btn btn-primary"
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDelete(program.id)}
                                    className="btn"
                                    style={{ background: '#e74c3c', color: 'white' }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
