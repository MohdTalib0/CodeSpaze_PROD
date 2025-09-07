import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  Upload,
  Download,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  Terminal
} from 'lucide-react';

interface GitWorkflowModalProps {
  onClose: () => void;
  onAction: (action: string) => void;
}

const GitWorkflowModal: React.FC<GitWorkflowModalProps> = ({ onClose, onAction }) => {
  const currentBranch = 'feature/user-auth';
  const stagedFiles = ['src/components/Auth.tsx', 'src/services/auth.ts'];
  const [commitMessage, setCommitMessage] = useState('feat: implement user authentication');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const addTerminalOutput = (output: string) => {
    setTerminalOutput(prev => [...prev, `$ ${output}`]);
  };

  const handleGitCommand = (command: string) => {
    addTerminalOutput(command);
    
    // Simulate command execution
    setTimeout(() => {
      switch (command) {
        case 'git status':
          addTerminalOutput('On branch feature/user-auth');
          addTerminalOutput('Changes to be committed:');
          addTerminalOutput('  (use "git restore --staged <file>..." to unstage)');
          addTerminalOutput('        modified:   src/components/Auth.tsx');
          addTerminalOutput('        modified:   src/services/auth.ts');
          addTerminalOutput('');
          addTerminalOutput('Changes not staged for commit:');
          addTerminalOutput('  (use "git add <file>..." to update what will be committed)');
          addTerminalOutput('        modified:   src/utils/validation.ts');
          break;
        case 'git add .':
          addTerminalOutput('All files staged successfully');
          break;
        case 'git commit -m "' + commitMessage + '"':
          addTerminalOutput(`[feature/user-auth ${Math.random().toString(16).substr(2, 7)}] ${commitMessage}`);
          addTerminalOutput(' 2 files changed, 45 insertions(+), 12 deletions(-)');
          onAction('commit');
          break;
        case 'git push origin feature/user-auth':
          addTerminalOutput('Enumerating objects: 5, done.');
          addTerminalOutput('Counting objects: 100% (5/5), done.');
          addTerminalOutput('Delta compression using up to 8 threads');
          addTerminalOutput('Compressing objects: 100% (3/3), done.');
          addTerminalOutput('Writing objects: 100% (3/3), 1.2 KiB | 1.2 MiB/s, done.');
          addTerminalOutput('Total 3 (delta 2), reused 0 (delta 0), pack-reused 0');
          addTerminalOutput('To github.com:company/project.git');
          addTerminalOutput('   abc1234..def5678  feature/user-auth -> feature/user-auth');
          onAction('push');
          break;
        case 'git pull origin develop':
          addTerminalOutput('From github.com:company/project.git');
          addTerminalOutput(' * branch            develop    -> FETCH_HEAD');
          addTerminalOutput('Updating abc1234..def5678');
          addTerminalOutput('Fast-forward');
          addTerminalOutput(' src/components/Header.tsx | 5 +++++');
          addTerminalOutput(' 1 file changed, 5 insertions(+)');
          onAction('pull');
          break;
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-black border border-gray-800 rounded-xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 md:gap-3">
            <GitBranch className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
            <h3 className="text-lg md:text-xl font-semibold text-white">Git Workflow Simulator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(95vh-120px)] md:h-[calc(90vh-120px)]">
          {/* Left Panel - Git Operations */}
          <div className="w-full md:w-1/2 p-4 md:p-6 md:border-r border-gray-800 overflow-y-auto">
            <div className="space-y-4 md:space-y-6">
              {/* Current Branch */}
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm md:text-base">Current Branch</h4>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-blue-500" />
                    <span className="font-mono text-blue-400 text-sm md:text-base">{currentBranch}</span>
                  </div>
                </div>
              </div>

              {/* Staged Files */}
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm md:text-base">Staged Files</h4>
                <div className="space-y-2">
                  {stagedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg p-2">
                      <span className="text-xs md:text-sm text-green-400 truncate">{file}</span>
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Commit */}
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm md:text-base">Commit Changes</h4>
                <div className="space-y-3">
                  <textarea
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Enter commit message..."
                    className="w-full p-3 border border-gray-700 rounded-lg resize-none bg-gray-900 text-white placeholder-gray-400 text-sm md:text-base"
                    rows={3}
                  />
                  <button
                    onClick={() => handleGitCommand(`git commit -m "${commitMessage}"`)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <GitCommit className="w-4 h-4" />
                    Commit Changes
                  </button>
                </div>
              </div>

              {/* Push/Pull */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleGitCommand('git push origin feature/user-auth')}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Upload className="w-4 h-4" />
                  Push
                </button>
                <button
                  onClick={() => handleGitCommand('git pull origin develop')}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Download className="w-4 h-4" />
                  Pull
                </button>
              </div>

              {/* Quick Commands */}
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm md:text-base">Quick Commands</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleGitCommand('git status')}
                    className="w-full text-left p-2 bg-gray-900 hover:bg-gray-800 rounded transition-colors text-xs md:text-sm text-gray-300 hover:text-white border border-gray-700"
                  >
                    git status
                  </button>
                  <button
                    onClick={() => handleGitCommand('git add .')}
                    className="w-full text-left p-2 bg-gray-900 hover:bg-gray-800 rounded transition-colors text-xs md:text-sm text-gray-300 hover:text-white border border-gray-700"
                  >
                    git add .
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Terminal (Collapsible on Mobile) */}
          <div className="w-full md:w-1/2 bg-gray-900 md:border-t border-gray-800">
            {/* Terminal Header with Toggle Button */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                <h4 className="font-semibold text-white text-sm md:text-base">Terminal Output</h4>
              </div>
              <button
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                {isTerminalOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Terminal Content */}
            <div className={`${isTerminalOpen ? 'block' : 'hidden'} md:block`}>
              <div className="bg-black rounded-lg m-4 md:m-6 p-4 h-[300px] md:h-[calc(100%-48px)] overflow-y-auto border border-gray-700">
                <div className="font-mono text-xs md:text-sm text-green-400 space-y-1">
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap break-words">{line}</div>
                  ))}
                </div>
                {terminalOutput.length === 0 && (
                  <div className="text-gray-500 text-center py-8 text-sm md:text-base">
                    Execute Git commands to see output here...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitWorkflowModal;
