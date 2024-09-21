import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';

interface CommandCLIProps {
  command: string;
}

const CommandCLI: React.FC<CommandCLIProps> = ({ command }) => (
  <div className="dark:bg-[#001833] bg-[#CCE2FC] p-4 rounded-lg mb-4 relative overflow-hidden">
    <div className="flex justify-between items-center">
      <code className="text-[#336BAD] dark:text-[#86B1E1]">{command}</code>
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default CommandCLI;
