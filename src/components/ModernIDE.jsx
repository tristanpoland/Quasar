import React, { useState, useEffect, useCallback } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { TitleBar } from '../components/TitleBar';
import { Editor } from '../components/Editor';
import { FileTree } from '../components/FileTree';
import { StatusBar } from '../components/StatusBar';
import { Notifications } from '../components/Notifications';
import { CommandPalette } from '../components/CommandPalette';
import { TabBar } from '../components/TabBar';
import { MenuBar } from './MenuBar';
import FileExplorer from './FileExplorer';
import { FolderOpen, Save, Terminal, X, Split, Maximize } from 'lucide-react';

const ModernIDE = () => {
    // State
    const [windowState, setWindowState] = useState('normal');
    const [expandedFolders, setExpandedFolders] = useState(['src']);
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFile, setActiveFile] = useState(null);
    const [files, setFiles] = useState({});
    const [openFiles, setOpenFiles] = useState([]);
    const [fileContents, setFileContents] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [isSplitView, setIsSplitView] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(272);
  
    const fs = useFileSystem();
  

    const commands = [
      {
        id: 'open-project',
        name: 'Open Project',
        shortcut: '⌘O',
        action: handleOpenProject,
        icon: FolderOpen
      },
      {
        id: 'save',
        name: 'Save File', 
        shortcut: '⌘S',
        action: handleFileSave,
        icon: Save
      }
      // ... add icons for other commands
    ];
  
    // File handling
    async function handleOpenProject() {
      try {
        const result = await fs.openProject();
        if (result) {
          setFiles(result.files);
          notify('Project opened successfully');
        }
      } catch (err) {
        notify(`Error: ${err.message}`);
      }
    }
  
    async function handleFileSelect(name, content, path) {
      try {
        const fullPath = path.join('/');
        if (!fileContents[fullPath]) {
          const content = await fs.readFile(fullPath);
          setFileContents(prev => ({
            ...prev,
            [fullPath]: content
          }));
        }
        
        setActiveFile(fullPath);
        if (!openFiles.includes(fullPath)) {
          setOpenFiles(prev => [...prev, fullPath]);
        }
      } catch (err) {
        notify(`Error opening file: ${err.message}`);
      }
    }
  
    async function handleFileSave() {
      if (!activeFile) return;
      try {
        await fs.saveFile(activeFile, fileContents[activeFile]);
        notify('File saved successfully');
      } catch (err) {
        notify(`Error saving file: ${err.message}`);
      }
    }
  
    // Notifications
    function notify(message) {
      const id = Date.now();
      setNotifications(prev => [...prev, { id, message }]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 3000);
    }
  
    // Keyboard shortcuts
    const handleKeyDown = useCallback((e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'k':
            e.preventDefault();
            setIsPaletteOpen(prev => !prev);
            break;
          case 's':
            e.preventDefault();
            handleFileSave();
            break;
          // ... more shortcuts
        }
      }
    }, [activeFile]);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }
    }, [handleKeyDown]);
  
    return (
      <div className="w-full h-screen flex flex-col bg-black text-white overflow-hidden">
        <TitleBar
          windowState={windowState}
          toggleMaximize={() => setWindowState(s => s === 'normal' ? 'maximized' : 'normal')}
          setIsPaletteOpen={setIsPaletteOpen}
          setSearchQuery={setSearchQuery}
        />
  
        {isPaletteOpen && (
          <CommandPalette
            commands={commands}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClose={() => setIsPaletteOpen(false)}
          />
        )}
  
        <Notifications notifications={notifications} />
  
        <div className={`flex flex-1 ${windowState === 'maximized' ? 'rounded-none' : 'rounded-lg m-2'}`}>
          <FileExplorer
            files={files}
            expandedFolders={expandedFolders}
            onFileSelect={handleFileSelect}
            onFolderToggle={folder => 
              setExpandedFolders(prev => 
                prev.includes(folder) 
                  ? prev.filter(f => f !== folder)
                  : [...prev, folder]
              )
            }
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setSidebarWidth}
          />
  
          <div className="flex-1 flex flex-col">
            <TabBar
              openFiles={openFiles}
              activeFile={activeFile}
              onFileSelect={path => setActiveFile(path)}
              onFileClose={path => {
                setOpenFiles(prev => prev.filter(f => f !== path));
                if (activeFile === path) {
                  setActiveFile(openFiles[0]);
                }
              }}
              onSplitViewToggle={() => setIsSplitView(!isSplitView)}
            />
  
            <div className="flex-1 flex">
              <div className="flex-1">
                {activeFile && (
                  <Editor
                    content={fileContents[activeFile] || ''}
                    language={getLanguageFromPath(activeFile)}
                    onChange={content => 
                      setFileContents(prev => ({
                        ...prev,
                        [activeFile]: content
                      }))
                    }
                  />
                )}
              </div>
  
              {isSplitView && (
                <>
                  <div className="w-px bg-gray-900" />
                  <div className="flex-1">
                    {activeFile && (
                      <Editor
                        content={fileContents[activeFile] || ''}
                        language={getLanguageFromPath(activeFile)}
                        onChange={content => 
                          setFileContents(prev => ({
                            ...prev,
                            [activeFile]: content
                          }))
                        }
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
  
          <MenuBar onSave={handleFileSave} />
        </div>
  
        <StatusBar activeFile={activeFile} />
      </div>
    );
  }

  export default ModernIDE;