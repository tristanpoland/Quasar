import { useState, useEffect } from 'react';

export const useFileSystem = () => {
    const [currentProject, setCurrentProject] = useState(null);
    const [api, setApi] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            setIsLoaded(false);
            return;
        }

        let isMounted = true;
        async function loadApis() {
            try {
                const tauriApis = await import('@tauri-apps/api');
                if (isMounted) {
                    setApi(tauriApis);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error('Failed to load Tauri APIs:', error);
            }
        }

        loadApis();
        return () => { isMounted = false; };
    }, []);

    const readDirRecursive = async (path) => {
        if (!isLoaded) return;
        const entries = await api.fs.readDir(path, { recursive: true });
        
        return entries.reduce((acc, entry) => {
            // Normalize path separators and remove base directory
            const relativePath = entry.path
                .replace(path, '')
                .replace(/\\/g, '/')
                .replace(/^\//, '');
                
            const parts = relativePath.split('/').filter(Boolean);
            let current = acc;
            
            parts.forEach((part, i) => {
                if (i === parts.length - 1) {
                    if (entry.children) {
                        current[part] = {};
                    } else {
                        current[part] = '';
                    }
                } else {
                    current[part] = current[part] || {};
                    current = current[part];
                }
            });
            
            return acc;
        }, {});
    };

    const openProject = async () => {
        if (!isLoaded) return;
        try {
            const selected = await api.dialog.open({
                directory: true,
                multiple: false,
            });

            if (selected) {
                const files = await readDirRecursive(selected);
                setCurrentProject(selected);
                return { path: selected, files };
            }
        } catch (err) {
            throw new Error(`Failed to open project: ${err}`);
        }
    };

    const saveFile = async (path, content) => {
        if (!isLoaded) return;
        try {
            await api.fs.writeTextFile(path, content);
        } catch (err) {
            throw new Error(`Failed to save file: ${err}`);
        }
    };

    const readFile = async (path) => {
        if (!isLoaded) return;
        try {
            return await api.fs.readTextFile(path);
        } catch (err) {
            throw new Error(`Failed to read file: ${err}`);
        }
    };

    return {
        currentProject,
        openProject,
        saveFile,
        readFile,
        api,
        isLoaded
    };
};