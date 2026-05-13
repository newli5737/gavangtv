import { motion } from "motion/react";
import { Send, Users } from "lucide-react";
import { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import type { Comment } from "@/types";

interface Props {
  comments: Comment[];
  onSendComment: (username: string, message: string) => Promise<void>;
  viewCount: number;
  onRefresh: () => void;
}

export function LiveChat({ comments, onSendComment, viewCount, onRefresh }: Props) {
  const [inputMessage, setInputMessage] = useState("");
  const [username] = useState(() => `User_${Math.floor(Math.random() * 9999)}`);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      await onSendComment(username, inputMessage.trim());
      setInputMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl overflow-hidden h-[calc(100vh-120px)] flex flex-col sticky top-24"
    >
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Trò chuyện trực tiếp</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span className="font-semibold">{viewCount.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">{viewCount.toLocaleString()} người đang xem</span>
        </div>
      </div>

      <ScrollArea.Root className="flex-1 overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="p-4 space-y-3">
            {comments.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                    {msg.username[0]}
                  </div>
                  <span className="text-sm font-semibold">{msg.username}</span>
                  {msg.isVerified && <span className="text-xs">✓</span>}
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 ml-8">{msg.message}</p>
              </motion.div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-150 ease-out hover:bg-secondary/30 data-[orientation=vertical]:w-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-muted rounded-full relative" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <div className="p-4 border-t border-glass-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Gửi tin nhắn..."
            className="flex-1 px-4 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white hover:shadow-lg hover:shadow-primary/30 transition-shadow"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Đang trò chuyện với tên <span className="font-semibold text-primary">{username}</span>
        </p>
      </div>
    </motion.div>
  );
}
