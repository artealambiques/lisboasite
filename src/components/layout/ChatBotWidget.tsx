import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const N8N_CHAT_URL = 'https://web.artetecnicalisboa.com.br/webhook/cb7ca1bd-f782-4df6-a73c-476be1ac3e89/chat';
const URL_SPLIT_REGEX = /(https?:\/\/[^\s]+)/g;
const URL_MATCH_REGEX = /https?:\/\/[^\s]+/;

function generateSessionId() {
  return 'session_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function ChatBotWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(N8N_CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          sessionId,
        }),
      });

      if (!response.ok) throw new Error('Erro na resposta');

      const data = await response.json();
      const output = data.output || data.text || data.response || JSON.stringify(data);
      setMessages(prev => [...prev, { role: 'assistant', content: output }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: t('chatbot.error') }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');

    return lines.map((line, lineIndex) => (
      <span key={`line-${lineIndex}`}>
        {line.split(URL_SPLIT_REGEX).map((part, partIndex) => {
          if (URL_MATCH_REGEX.test(part)) {
            return (
              <a
                key={`link-${lineIndex}-${partIndex}`}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="underline break-words"
              >
                {part}
              </a>
            );
          }

          return (
            <span key={`text-${lineIndex}-${partIndex}`}>
              {part}
            </span>
          );
        })}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-display font-semibold text-sm">{t('chatbot.title')}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                {t('chatbot.welcome')}
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-secondary text-secondary-foreground rounded-bl-sm'
                  }`}
                >
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-xl rounded-bl-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.2s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 bg-background border border-input rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-40 transition-opacity"
                aria-label="Enviar"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow group"
        aria-label="Chat"
      >
        {isOpen ? (
          <X className="w-7 h-7 group-hover:scale-110 transition-transform" />
        ) : (
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
        )}

        {/* Tooltip */}
        {!isOpen && (
          <span className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            {t('chatbot.title')}
          </span>
        )}
      </button>
    </>
  );
}
