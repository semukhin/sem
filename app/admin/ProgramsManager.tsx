'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// Imports removed because components do not exist. Using native HTML elements with utility classes.
import { Edit, Trash2, Save, Plus, ImageIcon, ArrowLeft, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
        if (confirm('Are you sure you want to delete this program?')) {
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

        newPrograms.sort((a, b) => a.order - b.order);

        onSave(newPrograms);
        setIsEditing(false);
        setCurrentProgram(null);
    };

    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const textareaClass = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";


    if (isEditing && currentProgram) {
        return (
            <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-2xl font-bold tracking-tight">
                        {programs.find(p => p.id === currentProgram.id) ? 'Edit Program' : 'Create New Program'}
                    </h2>
                    <Button variant="ghost" onClick={() => { setIsEditing(false); setCurrentProgram(null); }}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Button>
                </div>

                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Program Title *</label>
                                <input
                                    type="text"
                                    value={currentProgram.title}
                                    onChange={(e) => setCurrentProgram({ ...currentProgram, title: e.target.value })}
                                    required
                                    placeholder="e.g. Relaxium"
                                    className={inputClass}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Display Order *</label>
                                <input
                                    type="number"
                                    value={currentProgram.order}
                                    onChange={(e) => setCurrentProgram({ ...currentProgram, order: parseInt(e.target.value) || 1 })}
                                    required
                                    min="1"
                                    className={inputClass}
                                />
                                <p className="text-xs text-muted-foreground">Programs are sorted by this number (ascending).</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description (HTML supported) *</label>
                                <textarea
                                    value={currentProgram.description}
                                    onChange={(e) => setCurrentProgram({ ...currentProgram, description: e.target.value })}
                                    required
                                    rows={8}
                                    placeholder="Full program description..."
                                    className={textareaClass}
                                />
                            </div>

                            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                                <label className="text-sm font-medium flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Program Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => onImageUpload(e, currentProgram, setCurrentProgram)}
                                    className={inputClass}
                                />
                                {currentProgram.imageUrl && (
                                    <div className="relative group rounded-md overflow-hidden border w-full max-w-md">
                                        <img src={currentProgram.imageUrl} alt="Preview" className="w-full h-64 object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setCurrentProgram({ ...currentProgram, imageUrl: '' })}
                                            className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="gap-2"><Save className="w-4 h-4" /> Save Program</Button>
                                <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setCurrentProgram(null); }}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-muted/20 p-4 rounded-lg">
                <h2 className="text-xl font-semibold">Programs ({programs.length})</h2>
                <Button onClick={handleCreateNew} className="gap-2">
                    <Plus className="w-4 h-4" /> Create Program
                </Button>
            </div>

            {programs.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-muted p-4 rounded-full mb-4">
                            <RefreshCw className="w-8 h-8 text-muted-foreground opacity-50" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Programs Yet</h3>
                        <p className="text-muted-foreground max-w-sm mb-6">Create programs content for your visitors.</p>
                        <Button onClick={handleCreateNew}>Create Program</Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {programs.sort((a, b) => a.order - b.order).map((program) => (
                        <Card key={program.id} className="overflow-hidden hover:shadow-md transition-all group">
                            <div className="flex flex-col md:flex-row gap-6 p-6">
                                {program.imageUrl && (
                                    <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 border relative">
                                        <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover" />
                                        <Badge className="absolute top-2 left-2 bg-primary/90">#{program.order}</Badge>
                                    </div>
                                )}
                                <div className="flex-1 space-y-4">
                                    {!program.imageUrl && <div className="flex items-center gap-2"><Badge variant="outline">#{program.order}</Badge><h3 className="text-xl font-bold">{program.title}</h3></div>}
                                    {program.imageUrl && <h3 className="text-xl font-bold">{program.title}</h3>}

                                    <div className="prose prose-sm text-muted-foreground line-clamp-3" dangerouslySetInnerHTML={{ __html: program.description }} />

                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(program)} className="gap-2">
                                            <Edit className="w-4 h-4" /> Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(program.id)} className="gap-2">
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
