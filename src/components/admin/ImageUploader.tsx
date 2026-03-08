import React, { useRef, useState } from 'react';
import { Upload, Link, X, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

const ImageUploader = ({ value, onChange, label = 'Hình ảnh' }: ImageUploaderProps) => {
    const [mode, setMode] = useState<'url' | 'file'>('url');
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (data.url) onChange(data.url);
        } catch {
            alert('Upload thất bại, thử lại!');
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    return (
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">{label}</label>

            {/* Mode toggle */}
            <div className="flex bg-zinc-100 rounded-lg p-0.5 mb-3 w-fit">
                <button
                    type="button"
                    onClick={() => setMode('url')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'url' ? 'bg-white shadow text-zinc-800' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                    <Link className="w-3 h-3" /> URL
                </button>
                <button
                    type="button"
                    onClick={() => setMode('file')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'file' ? 'bg-white shadow text-zinc-800' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                    <Upload className="w-3 h-3" /> Upload từ máy
                </button>
            </div>

            {mode === 'url' ? (
                <input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-zinc-900 outline-none transition-all text-sm"
                />
            ) : (
                <div
                    onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-dashed border-zinc-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all"
                >
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs text-zinc-500">Đang tải lên...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-zinc-400">
                            <Upload className="w-7 h-7" />
                            <span className="text-xs font-semibold">Nhấp để chọn file ảnh</span>
                            <span className="text-[10px]">JPG, PNG, WebP · Tối đa 20MB</span>
                        </div>
                    )}
                </div>
            )}

            {/* Preview */}
            {value && (
                <div className="mt-3 relative w-full h-32 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200">
                    <img src={value} alt="preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                        <X className="w-3 h-3 text-zinc-600" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
