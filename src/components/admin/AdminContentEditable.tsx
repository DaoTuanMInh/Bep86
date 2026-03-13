import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Bold, List, ListOrdered, Image as ImageIcon, X, FolderPlus, UploadCloud, Table, Italic, Underline, AlignLeft, AlignCenter, AlignRight, SmilePlus, Trash, ArrowDownSquare, Minus, Plus, GripHorizontal, ChevronDown, PanelBottomClose, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

declare global {
    interface Window {
        isAdminModeActive: boolean;
        openImgManager: (img: HTMLElement | null, key: string | null, onSelect?: (url: string) => void) => void;
    }
}

export default function AdminContentEditable() {
    const { isAdmin } = useAdmin();
    const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });
    const [showToolbar, setShowToolbar] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [collapsed, setCollapsed] = useState(false);
    // pos for floating collapsed circle / expanded bar
    const [floatPos, setFloatPos] = useState({ x: window.innerWidth / 2 - 180, y: window.innerHeight - 72 });
    const dragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const toolbarRef = useRef<HTMLDivElement>(null);
    const syncPausedRef = useRef(false);
    const syncPendingRef = useRef(false);

    const startDrag = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        dragging.current = true;
        dragOffset.current = { x: e.clientX - floatPos.x, y: e.clientY - floatPos.y };
        const onMouseMove = (ev: MouseEvent) => {
            if (!dragging.current) return;
            setFloatPos({ x: ev.clientX - dragOffset.current.x, y: ev.clientY - dragOffset.current.y });
        };
        const onMouseUp = () => { dragging.current = false; window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }, [floatPos]);

    // Store loaded CMS content
    const [cmsData, setCmsData] = useState<{ key: string, value: string }[]>([]);
    const cmsDataRef = React.useRef(cmsData);
    cmsDataRef.current = cmsData;
    const cmsLoadedRef = React.useRef(false);

    // Load CMS from DB on mount. Also expose a refresh function globally.
    useEffect(() => {
        const loadCMS = () => {
            fetch('/api/content')
                .then(r => r.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setCmsData(data);
                        cmsLoadedRef.current = true;
                    }
                })
                .catch(console.error);
        };
        loadCMS();
        // Allow external callers (e.g. after page navigation) to refresh CMS
        (window as any).refreshCMS = loadCMS;
        return () => { delete (window as any).refreshCMS; };
    }, []);

    const [imgManagerObj, setImgManagerObj] = useState<{
        open: boolean;
        target: HTMLElement | null;
        key: string | null;
        onSelect?: (url: string) => void;
    }>({ open: false, target: null, key: null });

    // Store the setter in a ref to always have the latest version
    const imgObjRef = React.useRef(setImgManagerObj);
    imgObjRef.current = setImgManagerObj;

    // Ensure state bindings apply properly for image manager
    useEffect(() => {
        (window as any).openImgManager = (img: HTMLElement | null, key: string | null, onSelect?: (url: string) => void) => {
            imgObjRef.current({ open: true, target: img, key, onSelect });
            // Load files from server whenever the panel opens
            const refreshFiles = () => {
                fetch('/api/files').then(r => r.json()).then(data => {
                    if (Array.isArray(data)) setUploadedFiles(data);
                }).catch(() => {});
            };
            refreshFiles();
            (window as any).refreshFiles = refreshFiles;
        };

        return () => {
            delete (window as any).openImgManager;
        };
    }, []);

    useEffect(() => {
        window.isAdminModeActive = isAdmin;

        // WeakSet to track which elements have already had event listeners attached
        const boundElements = new WeakSet<Element>();

        // Hàm tạo ID cho thẻ để map với DB
        const generateElementKey = (el: Element) => {
            if (el.getAttribute('data-cms-key')) return el.getAttribute('data-cms-key') as string;
            let path = '';
            let curr: Element | null = el;
            while (curr && curr.tagName !== 'BODY') {
                let index = 0;
                let sibling = curr.previousElementSibling;
                while (sibling) {
                    if (sibling.tagName === curr.tagName) index++;
                    sibling = sibling.previousElementSibling;
                }
                path = `/${curr.tagName}[${index}]${path}`;
                curr = curr.parentElement;
            }
            const pageId = window.location.hash || '#home';
            const finalKey = (window.location.pathname + pageId).replace(/[\/\#]/g, '_') + path;
            el.setAttribute('data-cms-key', finalKey);
            return finalKey;
        };

        // Checks if an element is a "safe leaf" — only pure text or basic inline tags as children
        const isEditableLeaf = (el: Element): boolean => {
            // Must have some text
            if (!el.textContent?.trim()) return false;

            // If it has children, check if any of them are 'safe' or already editable
            const tagSet = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI', 'TD', 'TH', 'SPAN']);
            for (const child of Array.from(el.children)) {
                if (tagSet.has(child.tagName) || child.hasAttribute('data-cms-key')) return false;
            }

            // No block-level children (only allow basic formatting inline tags)
            const allowedInline = new Set(['STRONG', 'EM', 'B', 'I', 'U', 'BR']);
            for (const child of Array.from(el.children)) {
                if (!allowedInline.has(child.tagName)) return false;
            }
            return true;
        };

        // For text elements: exclude if inside link, button, nav, admin zones
        const isInExcludedZone = (el: Element): boolean => {
            if (el.hasAttribute('data-cms-key')) return false;
            return !!(
                el.closest('.admin-ignore') ||
                el.closest('header') ||
                el.closest('nav') ||
                el.closest('.header-gradient') ||
                el.closest('button') ||
                el.closest('a') ||
                el.closest('svg') ||
                el.closest('form') ||
                el.closest('input') ||
                el.closest('select') ||
                el.closest('textarea') ||
                el.closest('script') ||
                el.closest('[data-no-edit]')
            );
        };

        const isImgInExcludedZone = (img: Element): boolean => {
            return !!(
                img.closest('.admin-ignore') ||
                img.closest('button') ||
                img.closest('svg') ||
                img.closest('form') ||
                img.closest('[data-no-edit]')
            );
        };

        // Block all <a> clicks while in admin mode so product cards don't navigate
        // BUT allow clicks on admin-img-edit images through (so image manager can open)
        const handleLinkClick = (e: MouseEvent) => {
            if (!window.isAdminModeActive) return;
            const target = e.target as HTMLElement;
            // Allow image manager and contenteditable focus clicks to pass through
            if (target.classList.contains('admin-img-edit') || target.getAttribute('contenteditable')) return;
            if (target.hasAttribute('data-cms-key')) return; // Also allow elements with manual keys
            if (target.closest('.admin-ignore')) return;
            const link = target.closest('a');
            if (link && !link.closest('.admin-ignore')) {
                e.preventDefault();
                e.stopPropagation();

                // If it has a CMS link key, allow editing the URL
                const linkKey = link.getAttribute('data-cms-link');
                if (linkKey && window.isAdminModeActive) {
                    const currentUrl = link.getAttribute('href') || '';
                    const newUrl = prompt('Nhập địa chỉ liên kết (URL):', currentUrl);
                    if (newUrl !== null && newUrl !== currentUrl) {
                        link.setAttribute('href', newUrl);
                        
                        // Save to CMS
                        const idx = cmsDataRef.current.findIndex(c => c.key === linkKey);
                        if (idx > -1) cmsDataRef.current[idx].value = newUrl;
                        else cmsDataRef.current.push({ key: linkKey, value: newUrl });

                        fetch('/api/content', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ key: linkKey, value: newUrl })
                        }).catch(console.error);
                    }
                }
            }
        };
        document.addEventListener('click', handleLinkClick, true);

        const syncDOM = () => {
            if (syncPausedRef.current) return;
            // Combine safe tags and elements with explicit keys
            const selectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'td', 'th', 'span', '[data-cms-key]:not(img)'];
            const allElements = document.querySelectorAll(selectors.join(','));

            allElements.forEach(el => {
                if (el.tagName === 'IMG') return; // Handled separately
                if (isInExcludedZone(el)) return;

                // If it doesn't have a manual key, check if it's a "leaf" node for automatic editing
                if (!el.hasAttribute('data-cms-key')) {
                    if (!isEditableLeaf(el)) return;
                }

                const key = generateElementKey(el);
                const saved = cmsDataRef.current.find(c => c.key === key);

                // ── APPLY SAVED CMS CONTENT ──
                // Check if we need to apply content (either not loaded, or key changed)
                const isFocused = document.activeElement === el;
                const lastLoadedKey = el.getAttribute('data-cms-key-active');
                const needsReload = !el.getAttribute('data-cms-loaded') || lastLoadedKey !== key;

                const isBg = el instanceof HTMLElement && (
                    (el.style.backgroundImage && el.style.backgroundImage !== 'none') || 
                    (el.style.background && (el.style.background.includes('url') || el.style.background.includes('gradient'))) ||
                    (el.classList.contains('bg-cover') || el.classList.contains('bg-center'))
                );

                if (saved && !isFocused && needsReload) {
                    if (isBg) {
                        (el as HTMLElement).style.backgroundImage = `url("${saved.value}")`;
                    } else {
                        // Safety: Only replace innerHTML if we are sure it's a "text leaf" 
                        // i.e., no block-level children or complex structure.
                        const hasBlockChildren = Array.from(el.children).some(child => 
                            !['STRONG', 'EM', 'B', 'I', 'U', 'BR', 'SPAN'].includes(child.tagName)
                        );
                        if (!hasBlockChildren && el.innerHTML !== saved.value) {
                            el.innerHTML = saved.value;
                        }
                    }
                    el.setAttribute('data-cms-loaded', 'true');
                    el.setAttribute('data-cms-key-active', key);
                }

                if (isAdmin) {
                    if (isBg) {
                        el.classList.add('admin-img-edit');
                        if (!boundElements.has(el)) {
                            boundElements.add(el);
                            el.addEventListener('mousedown', (e) => {
                                if (!window.isAdminModeActive) return;
                                e.preventDefault();
                                e.stopPropagation();
                                window.openImgManager(el as HTMLElement, key);
                            });
                        }
                    } else {
                        // Regular text element
                        if (!el.getAttribute('contenteditable')) {
                            el.setAttribute('contenteditable', 'true');
                            el.setAttribute('spellcheck', 'false');
                            el.classList.add('admin-editable');
                        }
                        if (!boundElements.has(el)) {
                            boundElements.add(el);
                            el.addEventListener('blur', (e) => {
                                if (!window.isAdminModeActive) return;
                                const val = (e.target as HTMLElement).innerHTML;
                                const idx = cmsDataRef.current.findIndex(c => c.key === key);
                                if (idx > -1) cmsDataRef.current[idx].value = val;
                                else cmsDataRef.current.push({ key, value: val });
                                fetch('/api/content', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ key, value: val })
                                }).catch(console.error);
                            });
                        }
                    }
                } else {
                    el.removeAttribute('contenteditable');
                    el.classList.remove('admin-editable');
                    el.classList.remove('admin-img-edit');
                }
            });

            // ── IMAGES ──
            document.querySelectorAll('img').forEach((img) => {
                if (isImgInExcludedZone(img)) return;

                const key = generateElementKey(img);
                const saved = cmsDataRef.current.find(c => c.key === key);
                const lastLoadedKey = img.getAttribute('data-cms-key-active');
                const needsReload = !img.getAttribute('data-cms-loaded') || lastLoadedKey !== key || img.src !== saved?.value;
                
                if (saved && needsReload) {
                    if (img.src !== saved.value) img.src = saved.value;
                    img.setAttribute('data-cms-loaded', 'true');
                    img.setAttribute('data-cms-key-active', key);
                }

                const notEditable = img.closest('[data-no-edit]') || img.hasAttribute('data-no-edit-img');

                if (isAdmin && !notEditable) {
                    img.classList.add('admin-img-edit');
                    if (img.parentElement) img.parentElement.classList.add('editable-image');

                    if (!boundElements.has(img)) {
                        boundElements.add(img);
                        img.addEventListener('mousedown', (e) => {
                            if (!window.isAdminModeActive) return;
                            e.preventDefault();
                            e.stopPropagation();
                            window.openImgManager(img as HTMLImageElement, key);
                        });
                        img.addEventListener('click', (e) => {
                            if (!window.isAdminModeActive) return;
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    }
                } else {
                    img.classList.remove('admin-img-edit');
                    if (img.parentElement?.classList.contains('editable-image')) {
                        img.parentElement.classList.remove('editable-image');
                    }
                }
            });

            // ── LINKS ──
            document.querySelectorAll('[data-cms-link]').forEach((link) => {
                const key = link.getAttribute('data-cms-link');
                if (!key) return;
                const saved = cmsDataRef.current.find(c => c.key === key);
                if (saved && (link.getAttribute('href') !== saved.value)) {
                    link.setAttribute('href', saved.value);
                    link.setAttribute('data-cms-link-loaded', 'true');
                }
                if (isAdmin) {
                    link.classList.add('admin-link-edit');
                } else {
                    link.classList.remove('admin-link-edit');
                }
            });
        };

        // Store syncDOM in a ref so cmsData-change effect can call it
        (window as any).__syncDOM = syncDOM;

        const onFocusIn = (e: FocusEvent) => {
            if ((e.target as HTMLElement)?.getAttribute?.('contenteditable') === 'true') {
                syncPausedRef.current = true;
            }
        };
        const onFocusOut = () => { syncPausedRef.current = false; };
        document.addEventListener('focusin', onFocusIn);
        document.addEventListener('focusout', onFocusOut);

        // Run immediately, then every 3s (only when not editing)
        syncDOM();
        const interval = setInterval(() => { if (!syncPausedRef.current) syncDOM(); }, 3000);

        const observer = new MutationObserver(() => {
            if (syncPausedRef.current || syncPendingRef.current) return;
            syncPendingRef.current = true;
            requestAnimationFrame(() => {
                syncDOM();
                syncPendingRef.current = false;
            });
        });
        observer.observe(document.body, { 
            childList: true, 
            subtree: true, 
            attributes: true, 
            attributeFilter: ['class', 'style', 'src'] 
        });

        return () => {
            clearInterval(interval);
            observer.disconnect();
            document.removeEventListener('click', handleLinkClick, true);
            document.removeEventListener('focusin', onFocusIn);
            document.removeEventListener('focusout', onFocusOut);
            delete (window as any).__syncDOM;
        };
    }, [isAdmin]);

    // Whenever cmsData arrives from DB, force a DOM sync so content shows
    useEffect(() => {
        if (cmsData.length > 0 && typeof (window as any).__syncDOM === 'function') {
            // Small delay to let React finish rendering the current page
            setTimeout(() => (window as any).__syncDOM?.(), 100);
        }
    }, [cmsData]);

    // Handle selection for toolbar
    useEffect(() => {
        if (!isAdmin) {
            setShowToolbar(false);
            return;
        }

        // Always show toolbar when in admin mode, anchored to the bottom
        setShowToolbar(true);
    }, [isAdmin]);

    const exec = (e: React.MouseEvent, cmd: string, val: string | undefined = undefined) => {
        e.preventDefault(); // Prevent losing focus on selection
        document.execCommand(cmd, false, val);
    };

    const colorOptions = [
        { name: 'Đỏ', hex: '#ef4444' },
        { name: 'Cam', hex: '#f97316' },
        { name: 'Vàng', hex: '#eab308' },
        { name: 'Lục', hex: '#22c55e' },
        { name: 'Lam', hex: '#3b82f6' },
        { name: 'Đen', hex: '#000000' },
        { name: 'Trắng', hex: '#ffffff' }
    ];

    // File manager state
    const [uploadedFiles, setUploadedFiles] = useState<{name: string; url: string; folder: string}[]>([]);
    const [currentFolder, setCurrentFolder] = useState('/');
    const [folders, setFolders] = useState<string[]>(['/']);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const [savedSelection, setSavedSelection] = useState<Range | null>(null);

    const loadFiles = () => {
        fetch('/api/files').then(r => r.json()).then(data => {
            if (Array.isArray(data)) {
                setUploadedFiles(data);
                // Discover folders from files
                const discovered = Array.from(new Set(['/', ...data.map((f: any) => f.folder).filter(Boolean)]));
                setFolders(prev => Array.from(new Set([...prev, ...discovered])).sort());
            }
        }).catch(() => {});
    };

    useEffect(() => {
        if (imgManagerObj.open) loadFiles();
    }, [imgManagerObj.open]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('folder', currentFolder);
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (data.url) {
                const newImg = { name: file.name, url: data.url, folder: currentFolder };
                setUploadedFiles(prev => [newImg, ...prev]);
                
                if (imgManagerObj.onSelect) {
                    imgManagerObj.onSelect(data.url);
                    setImgManagerObj({ open: false, target: null, key: null });
                } else if (imgManagerObj.target && imgManagerObj.key) {
                    const target = imgManagerObj.target;
                    const key = imgManagerObj.key;

                    // Optimistic update with preloading for smooth transition
                    const tempImg = new Image();
                    tempImg.src = data.url;
                    tempImg.onload = () => {
                        if (target instanceof HTMLImageElement) {
                            target.src = data.url;
                        } else {
                            target.style.backgroundImage = `url("${data.url}")`;
                        }
                        target.setAttribute('data-cms-loaded', 'true');
                    };
                    
                    const idx = cmsDataRef.current.findIndex(c => c.key === key);
                    if (idx > -1) cmsDataRef.current[idx].value = data.url;
                    else cmsDataRef.current.push({ key, value: data.url });

                    fetch('/api/content', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key, value: data.url })
                    }).catch(console.error);
                    
                    setImgManagerObj({ open: false, target: null, key: null });
                }
            }
        } catch {
            alert('Upload thất bại!');
        } finally {
            setIsUploading(false);
            if (uploadInputRef.current) uploadInputRef.current.value = '';
        }
    };

    const handleCreateFolder = () => {
        const name = prompt('Tên thư mục mới:');
        if (!name?.trim()) return;
        const path = `/${name.trim().replace(/[^a-zA-Z0-9_-]/g, '-')}`;
        if (!folders.includes(path)) {
            setFolders(prev => [...prev, path].sort());
        }
        setCurrentFolder(path);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files) as File[];
        const imgFiles = files.filter(f => f.type.startsWith('image/'));
        
        if (imgFiles.length === 0) return;
        
        setIsUploading(true);
        for (const file of imgFiles) {
            try {
                const fd = new FormData();
                fd.append('file', file);
                fd.append('folder', currentFolder);
                const res = await fetch('/api/upload', { method: 'POST', body: fd });
                const data = await res.json();
                if (data.url) {
                    setUploadedFiles(prev => [{ name: file.name, url: data.url, folder: currentFolder }, ...prev]);
                }
            } catch (err) {
                console.error("Upload error:", err);
            }
        }
        setIsUploading(false);
        loadFiles();
    };

    const handleDeleteFolder = async (folderPath: string) => {
        if (folderPath === '/') return;
        if (!confirm(`Bạn có chắc muốn xóa thư mục "${folderPath.slice(1)}" và TẤT CẢ ảnh bên trong?`)) return;
        
        try {
            const res = await fetch(`/api/folders?folder=${encodeURIComponent(folderPath)}`, { method: 'DELETE' });
            if (res.ok) {
                setFolders(prev => prev.filter(f => f !== folderPath));
                setUploadedFiles(prev => prev.filter(f => f.folder !== folderPath));
                setCurrentFolder('/');
            }
        } catch {
            alert('Xóa thư mục thất bại!');
        }
    };

    const handleDeleteFile = async (fileUrl: string) => {
        if (!confirm('Xóa ảnh này?')) return;
        // Remove from local state
        setUploadedFiles(prev => prev.filter(f => f.url !== fileUrl));
        // Attempt server-side delete
        try {
            const filename = fileUrl.split('/').pop();
            if (filename) await fetch(`/api/files/${encodeURIComponent(filename)}`, { method: 'DELETE' });
        } catch {}
    };

    if (!isAdmin) return null;

    return (
        <div style={{ position: 'relative', zIndex: 100000 }}>
            {/* Floating Toolbar or Collapsed Circle */}
            <AnimatePresence mode="wait">
                {collapsed ? (
                    // ── Collapsed circle ──
                    <motion.div
                        key="collapsed"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        style={{ position: 'fixed', left: floatPos.x, top: floatPos.y, zIndex: 100001 }}
                        className="pointer-events-auto"
                    >
                        <div
                            className="w-12 h-12 rounded-full bg-brand-blue shadow-xl shadow-blue-900/40 flex items-center justify-center cursor-pointer border-2 border-white/20 hover:scale-110 transition-transform select-none"
                            title="Mở thanh biên tập"
                        >
                            {/* Drag handle ring */}
                            <div
                                className="absolute inset-0 rounded-full cursor-grab active:cursor-grabbing"
                                onMouseDown={startDrag}
                            />
                            <button
                                onMouseDown={e => { e.stopPropagation(); setCollapsed(false); }}
                                className="relative z-10 w-7 h-7 flex items-center justify-center"
                            >
                                <Edit3 className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    // ── Full toolbar ──
                    <motion.div
                        key="expanded"
                        ref={toolbarRef}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ position: 'fixed', left: floatPos.x, top: floatPos.y, zIndex: 100001 }}
                        className="bg-zinc-900 border border-zinc-700 shadow-2xl shadow-black/50 rounded-xl flex flex-wrap items-center p-1.5 gap-1 select-none pointer-events-auto max-w-[95vw] md:max-w-max"
                        onMouseDown={e => e.preventDefault()}
                    >
                        {/* ── Drag handle ── */}
                        <div
                            className="cursor-grab active:cursor-grabbing p-1 text-zinc-600 hover:text-zinc-300 transition-colors rounded hover:bg-zinc-800"
                            onMouseDown={startDrag}
                            title="Kéo để di chuyển"
                        >
                            <GripHorizontal className="w-4 h-4" />
                        </div>
                        <div className="w-px h-5 bg-zinc-700 mr-1"></div>
                        <button onMouseDown={e => exec(e, 'bold')} className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Đậm (Ctrl+B)"><Bold className="w-3.5 h-3.5" /></button>
                        <button onMouseDown={e => exec(e, 'italic')} className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Nghiêng (Ctrl+I)"><Italic className="w-3.5 h-3.5" /></button>
                        <button onMouseDown={e => exec(e, 'underline')} className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Gạch chân (Ctrl+U)"><Underline className="w-3.5 h-3.5" /></button>

                        <div className="w-px h-5 bg-zinc-700 mx-1"></div>
                        {/* Font Size Control */}
                        <div className="flex items-center gap-0.5 bg-zinc-800/60 rounded-lg px-1 py-0.5">
                            <button
                                onMouseDown={e => { e.preventDefault(); const s = Math.max(8, fontSize - 1); setFontSize(s); document.execCommand('fontSize', false, '7'); const fonts = document.querySelectorAll('font[size="7"]'); fonts.forEach(f => { (f as HTMLElement).removeAttribute('size'); (f as HTMLElement).style.fontSize = s + 'px'; }); }}
                                className="p-0.5 text-zinc-400 hover:text-white rounded transition-colors"
                                title="Giảm cỡ chữ"
                            ><Minus className="w-3 h-3" /></button>
                            <input
                                type="number"
                                value={fontSize}
                                min={8} max={96}
                                onChange={e => setFontSize(Number(e.target.value))}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        document.execCommand('fontSize', false, '7');
                                        const fonts = document.querySelectorAll('font[size="7"]');
                                        fonts.forEach(f => { (f as HTMLElement).removeAttribute('size'); (f as HTMLElement).style.fontSize = fontSize + 'px'; });
                                    }
                                }}
                                className="w-9 text-center text-xs font-bold text-white bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                                onMouseDown={e => { e.preventDefault(); const s = Math.min(96, fontSize + 1); setFontSize(s); document.execCommand('fontSize', false, '7'); const fonts = document.querySelectorAll('font[size="7"]'); fonts.forEach(f => { (f as HTMLElement).removeAttribute('size'); (f as HTMLElement).style.fontSize = s + 'px'; }); }}
                                className="p-0.5 text-zinc-400 hover:text-white rounded transition-colors"
                                title="Tăng cỡ chữ"
                            ><Plus className="w-3 h-3" /></button>
                        </div>


                        <div className="w-px h-5 bg-zinc-700 mx-1"></div>
                        <button onMouseDown={e => exec(e, 'justifyLeft')} className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Canh trái"><AlignLeft className="w-3.5 h-3.5" /></button>
                        <button onMouseDown={e => exec(e, 'justifyCenter')} className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Canh giữa"><AlignCenter className="w-3.5 h-3.5" /></button>
                        <button onMouseDown={e => exec(e, 'justifyRight')} className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Canh phải"><AlignRight className="w-3.5 h-3.5" /></button>

                        <div className="w-px h-5 bg-zinc-700 mx-1"></div>
                        <button onMouseDown={e => exec(e, 'insertUnorderedList')} className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Gạch đầu dòng"><List className="w-3.5 h-3.5" /></button>
                        <button onMouseDown={e => exec(e, 'insertOrderedList')} className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors" title="Đánh số thứ tự"><ListOrdered className="w-3.5 h-3.5" /></button>

                        <div className="w-px h-5 bg-zinc-700 mx-1"></div>
                        <button
                            onMouseDown={e => {
                                e.preventDefault();
                                // Save current selection range before opening manager
                                const sel = window.getSelection();
                                let range: Range | null = null;
                                if (sel && sel.rangeCount > 0) range = sel.getRangeAt(0).cloneRange();

                                window.openImgManager(null, null, (url) => {
                                    // Restore focus and selection
                                    if (range) {
                                        const selection = window.getSelection();
                                        if (selection) {
                                            selection.removeAllRanges();
                                            selection.addRange(range);
                                        }
                                    }
                                    document.execCommand('insertImage', false, url);
                                    
                                    // Add editor class to the newly inserted image
                                    setTimeout(() => {
                                        document.querySelectorAll('img').forEach(img => {
                                            if (!img.classList.contains('admin-img-edit') && !img.closest('.admin-ignore')) {
                                                img.classList.add('admin-img-edit');
                                                img.style.maxWidth = '100%';
                                                img.style.display = 'block';
                                                img.style.margin = '10px 0';
                                            }
                                        });
                                    }, 100);
                                });
                            }}
                            className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors flex items-center gap-1" title="Chèn Hình ảnh"
                        ><ImageIcon className="w-3.5 h-3.5" /></button>

                        <button
                            onMouseDown={e => {
                                e.preventDefault();
                                const icon = prompt('Nhập Emoji hoặc Icon (ví dụ: ⭐, ✅, ❌, 🔥, 🎁, 🚀, 💡):', '⭐');
                                if (icon) document.execCommand('insertHTML', false, `<span>${icon}</span>`);
                            }}
                            className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors flex items-center gap-1" title="Chèn Icon/Emoji"
                        ><SmilePlus className="w-3.5 h-3.5" /></button>

                        <div className="w-px h-5 bg-zinc-700 mx-1"></div>
                        <button
                            onMouseDown={e => {
                                e.preventDefault();
                                const rows = prompt('Nhập số dòng:', '3');
                                const cols = prompt('Nhập số cột:', '3');
                                if (rows && cols) {
                                    let html = '<table style="width:100%; border-collapse: collapse; min-width: 400px; margin: 15px 0;"><tbody>';
                                    for (let r = 0; r < parseInt(rows); r++) {
                                        html += '<tr>';
                                        for (let c = 0; c < parseInt(cols); c++) {
                                            html += `<td style="border: 1px solid #cbd5e1; padding: 10px; background-color: #ffffff;">Nội dung ${r + 1}-${c + 1}</td>`;
                                        }
                                        html += '</tr>';
                                    }
                                    html += '</tbody></table>';
                                    document.execCommand('insertHTML', false, html);

                                    // Add minor timeout to allow reflow and binding
                                    setTimeout(() => {
                                        document.querySelectorAll('td').forEach(td => {
                                            if (!td.getAttribute('contenteditable')) td.setAttribute('contenteditable', 'true');
                                            td.classList.add('admin-editable');
                                        });
                                    }, 100);
                                }
                            }}
                            className="p-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors flex items-center gap-1 border-r border-zinc-700 pr-2" title="Chèn Bảng"
                        ><Table className="w-3.5 h-3.5" /></button>

                        {/* Table Tools */}
                        <button
                            onMouseDown={e => {
                                e.preventDefault();
                                const sel = window.getSelection();
                                if (!sel || !sel.anchorNode) return;
                                const node = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode as Element;
                                const table = node?.closest('table');
                                if (table) {
                                    table.insertAdjacentHTML('afterend', '<p class="admin-editable" contenteditable="true">Nhập nội dung mới tại đây...</p><br/>');
                                } else {
                                    alert('Vui lòng đặt con trỏ chuột vào trong bảng để chèn đoạn văn dưới bảng.');
                                }
                            }}
                            className="p-1.5 text-blue-400 hover:bg-zinc-800 hover:text-blue-300 rounded transition-colors" title="Thêm vùng viết chữ dưới Bảng (nếu đang ở trong bảng)"
                        ><ArrowDownSquare className="w-4 h-4" /></button>

                        <button
                            onMouseDown={e => {
                                e.preventDefault();
                                const sel = window.getSelection();
                                if (!sel || !sel.anchorNode) return;
                                const node = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode as Element;
                                const table = node?.closest('table');
                                if (table && confirm('Xóa bảng này vĩnh viễn?')) {
                                    table.remove();
                                } else if (!table) {
                                    alert('Vui lòng đặt con trỏ chuột vào trong bảng để xóa.');
                                }
                            }}
                            className="p-1.5 text-red-400 hover:bg-zinc-800 hover:text-red-300 rounded transition-colors" title="Xóa Bảng hiện tại"
                        ><Trash className="w-4 h-4" /></button>

                        <div className="w-px h-5 bg-zinc-700 mx-1.5"></div>
                        <div className="flex bg-zinc-800/50 p-1 rounded-md items-center shadow-inner gap-1">
                            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest pl-1 mr-1">Chữ:</span>
                            {colorOptions.map(c => (
                                <button
                                    key={"text-" + c.hex}
                                    onMouseDown={e => { e.preventDefault(); document.execCommand('foreColor', false, c.hex); }}
                                    className="w-4 h-4 rounded-full border border-zinc-700/50 hover:scale-125 transition-transform"
                                    style={{ backgroundColor: c.hex }}
                                    title={"Màu chữ " + c.name}
                                ></button>
                            ))}
                        </div>
                        <div className="flex bg-zinc-800/50 p-1 rounded-md items-center shadow-inner gap-1 ml-1">
                            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest pl-1 mr-1">Nền:</span>
                            {colorOptions.map(c => (
                                <button
                                    key={"bg-" + c.hex}
                                    onMouseDown={e => { e.preventDefault(); document.execCommand('backColor', false, c.hex); }}
                                    className="w-4 h-4 rounded-full border border-zinc-700/50 hover:scale-125 transition-transform"
                                    style={{ backgroundColor: c.hex }}
                                    title={"Màu nền " + c.name}
                                ></button>
                            ))}
                            <button
                                onMouseDown={e => { e.preventDefault(); document.execCommand('backColor', false, 'transparent'); }}
                                className="w-4 h-4 rounded-full border border-zinc-500 hover:scale-125 transition-transform text-[8px] flex items-center justify-center text-zinc-400 bg-zinc-900"
                                title="Xóa màu nền"
                            >✖</button>
                        </div>
                        {/* ── Collapse button ── */}
                        <div className="w-px h-5 bg-zinc-700 ml-1"></div>
                        <button
                            onMouseDown={e => { e.preventDefault(); setCollapsed(true); }}
                            className="p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white rounded transition-colors ml-0.5"
                            title="Thu gọn thanh biên tập"
                        >
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                )
            }</AnimatePresence>

            {/* Image Manager / File Manager Sidebar */}
            <AnimatePresence>
                {imgManagerObj.open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto z-[100000]"
                            onMouseDown={() => setImgManagerObj({ open: false, target: null, key: null })}
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-80 md:w-96 bg-white shadow-2xl pointer-events-auto flex flex-col z-[100001] border-r border-zinc-200 admin-ignore"
                            onMouseDown={e => e.stopPropagation()}
                            data-no-edit="true"
                        >
                            <div className="p-5 header-gradient text-white flex justify-between items-center bg-brand-blue">
                                <h3 className="font-black text-lg flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5" /> Trình quản lý Tệp
                                </h3>
                                <button onMouseDown={() => setImgManagerObj({ open: false, target: null, key: null })} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                            </div>

                            {/* Toolbar: Create Folder + Upload */}
                            <div className="p-4 border-b border-zinc-100 flex gap-2">
                                <button
                                    onMouseDown={(e) => { e.preventDefault(); handleCreateFolder(); }}
                                    className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <FolderPlus className="w-4 h-4" /> Tạo Folder
                                </button>
                                <button
                                    onMouseDown={(e) => { e.preventDefault(); uploadInputRef.current?.click(); }}
                                    className="flex-1 bg-brand-blue text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow hover:opacity-90 transition-opacity"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <><div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang tải...</>
                                    ) : (
                                        <><UploadCloud className="w-4 h-4" /> Tải hình lên</>
                                    )}
                                </button>
                                <input
                                    ref={uploadInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleUpload}
                                />
                            </div>

                            {/* Folder navigation */}
                            <div className="px-4 py-3 border-b border-zinc-100 flex gap-2 flex-wrap">
                                {folders.map(f => (
                                    <div key={f} className="relative group/folder">
                                        <button
                                            onMouseDown={e => { e.preventDefault(); setCurrentFolder(f); }}
                                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                                                currentFolder === f
                                                    ? 'bg-brand-blue text-white pr-7'
                                                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                            }`}
                                        >
                                            <FolderPlus className="w-3 h-3" />
                                            {f === '/' ? 'Gốc' : f.slice(1)}
                                        </button>
                                        {f !== '/' && currentFolder === f && (
                                            <button
                                                onMouseDown={e => { e.preventDefault(); e.stopPropagation(); handleDeleteFolder(f); }}
                                                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
                                                title="Xóa thư mục"
                                            >
                                                <Trash className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* File Grid with Drag & Drop */}
                            <div 
                                className={`p-4 flex-1 overflow-y-auto relative transition-colors ${isDragging ? 'bg-blue-50/50 ring-2 ring-inset ring-brand-blue/30' : ''}`}
                                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                            >
                                {isDragging && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] z-10 pointer-events-none border-2 border-dashed border-brand-blue m-2 rounded-2xl">
                                        <UploadCloud className="w-12 h-12 text-brand-blue animate-bounce" />
                                        <p className="text-sm font-black text-brand-blue uppercase tracking-widest mt-2">Thả ảnh vào đây để tải lên</p>
                                    </div>
                                )}
                                {uploadedFiles.filter(f => (f.folder || '/') === currentFolder).length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-16 text-zinc-300">
                                        <UploadCloud className="w-10 h-10 mb-3 opacity-50" />
                                        <p className="text-xs font-bold uppercase tracking-widest">Chưa có ảnh nào</p>
                                        <p className="text-xs mt-1 text-zinc-400">Nhấn “Tải hình lên” để thêm ảnh</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-3">
                                    {uploadedFiles.filter(f => f.folder === currentFolder).map((file, idx) => (
                                        <div
                                            key={idx}
                                            className="aspect-square bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 cursor-pointer hover:ring-4 hover:ring-brand-blue/30 hover:shadow-xl transition-all group relative"
                                        >
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 admin-ignore"
                                                data-no-edit-img="true"
                                            />
                                            {/* Overlay: select + delete */}
                                            <div 
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 cursor-pointer"
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    if (imgManagerObj.onSelect) {
                                                        imgManagerObj.onSelect(file.url);
                                                        setImgManagerObj({ open: false, target: null, key: null });
                                                    } else if (imgManagerObj.target && imgManagerObj.key) {
                                                        const target = imgManagerObj.target;
                                                        const key = imgManagerObj.key;
                                                        const newVal = file.url;
                                                        
                                                        // Optimistic update with preloading for smooth transition
                                                        const tempImg = new Image();
                                                        tempImg.src = newVal;
                                                        tempImg.onload = () => {
                                                            if (target instanceof HTMLImageElement) {
                                                                target.src = newVal;
                                                            } else {
                                                                target.style.backgroundImage = `url("${newVal}")`;
                                                            }
                                                            target.setAttribute('data-cms-loaded', 'true');
                                                        };
                                                        
                                                        // Update local ref to prevent syncDOM reverting it
                                                        const idx = cmsDataRef.current.findIndex(c => c.key === key);
                                                        if (idx > -1) cmsDataRef.current[idx].value = newVal;
                                                        else cmsDataRef.current.push({ key, value: newVal });

                                                        fetch('/api/content', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ key, value: newVal })
                                                        }).catch(console.error);
                                                        setImgManagerObj({ open: false, target: null, key: null });
                                                    }
                                                }}
                                            >
                                                <span className="text-white text-[10px] font-black uppercase tracking-widest bg-brand-blue px-3 py-1.5 rounded-full pointer-events-none">
                                                    Chọn ảnh này
                                                </span>
                                                <button
                                                    onMouseDown={e => { e.preventDefault(); e.stopPropagation(); handleDeleteFile(file.url); }}
                                                    className="text-white bg-red-500/80 hover:bg-red-600 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
                                                >
                                                    <Trash className="w-3 h-3" /> Xóa
                                                </button>
                                            </div>
                                             <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] px-2 py-1 truncate">
                                                {file.name.replace('/api/file-view/', '')}
                                             </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
